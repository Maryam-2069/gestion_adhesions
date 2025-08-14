<?php

namespace App\Http\Controllers;

use App\Models\Adhesion;
use App\Models\Adherents;
use App\Models\TypeAdhesion;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic counts
        $totalAdherents = Adherents::count();
        $totalAdhesions = Adhesion::count();

        // Active memberships (not expired)
        $activeMemberships = Adhesion::where('date_fin', '>=', Carbon::now()->format('Y-m-d'))->count();

        // Total revenue calculation (more efficient)
        $totalMontant = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->sum('type_adhesions.prix');

        // Monthly revenue for current year
        $monthlyRevenue = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->select(
                DB::raw('SUBSTR(adhesions.date_debut, 6, 2) as month'),
                DB::raw('SUM(type_adhesions.prix) as revenue'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('adhesions.date_debut', Carbon::now()->year)
            ->groupBy(DB::raw('SUBSTR(adhesions.date_debut, 6, 2)'))
            ->orderBy('month')
            ->get();

        // Chart data for last 6 months
        $chartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthKey = $date->format('m');
            
            $monthData = $monthlyRevenue->firstWhere('month', $monthKey);
            
            $chartData[] = [
                'month' => $date->format('M'),
                'value' => $monthData ? (float) $monthData->revenue : 0,
                'membres' => $monthData ? (int) $monthData->count : 0,
            ];
        }

        // Membership types distribution
        $membershipTypes = DB::table('type_adhesions')
            ->leftJoin('adhesions', 'type_adhesions.id', '=', 'adhesions.type_adhesion_id')
            ->select(
                'type_adhesions.nom as name',
                'type_adhesions.prix',
                DB::raw('COUNT(adhesions.id) as count'),
                DB::raw('SUM(type_adhesions.prix) as total_revenue')
            )
            ->groupBy('type_adhesions.id', 'type_adhesions.nom', 'type_adhesions.prix')
            ->get();

        $totalTypeCount = $membershipTypes->sum('count');
        $colors = ['#3B82F6', '#1E40AF', '#60A5FA', '#34D399', '#F59E0B', '#EF4444'];

        $membershipTypesData = $membershipTypes->map(function ($type, $index) use ($totalTypeCount, $colors) {
            return [
                'name' => $type->name,
                'value' => $totalTypeCount > 0 ? round(($type->count / $totalTypeCount) * 100, 1) : 0,
                'color' => $colors[$index % count($colors)],
                'count' => (int) $type->count,
                'revenue' => (float) $type->total_revenue ?? 0,
            ];
        })->toArray();

        // Recent adhesions with status
        $recentAdhesions = Adhesion::with(['adherent', 'typeAdhesion'])
            ->latest('created_at')
            ->take(10)
            ->get()
            ->map(function ($adhesion) {
                $now = Carbon::now();
                $endDate = Carbon::parse($adhesion->date_fin);
                $daysUntilExpiration = $now->diffInDays($endDate, false);
                
                // Determine status
                $status = 'active';
                if ($daysUntilExpiration < 0) {
                    $status = 'expired';
                } elseif ($daysUntilExpiration <= 7) {
                    $status = 'expiring';
                } elseif ($adhesion->date_debut > $now->format('Y-m-d')) {
                    $status = 'pending';
                } else {
                    $status = 'approved';
                }

                return [
                    'id' => $adhesion->id,
                    'adherent' => ($adhesion->adherent->prenom ?? '') . ' ' . ($adhesion->adherent->nom ?? ''),
                    'type' => $adhesion->typeAdhesion->nom ?? 'N/A',
                    'date_debut' => $adhesion->date_debut,
                    'date_fin' => $adhesion->date_fin,
                    'status' => $status,
                    'montant' => (float) ($adhesion->typeAdhesion->prix ?? 0),
                    'days_until_expiration' => max(0, (int) $daysUntilExpiration),
                ];
            });

        // Growth calculations (compared to previous period)
        $currentMonth = Carbon::now();
        $previousMonth = Carbon::now()->subMonth();

        // Current month stats
        $currentMonthAdhesions = Adhesion::whereMonth('date_debut', $currentMonth->month)
            ->whereYear('date_debut', $currentMonth->year)
            ->count();

        $currentMonthRevenue = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->whereMonth('adhesions.date_debut', $currentMonth->month)
            ->whereYear('adhesions.date_debut', $currentMonth->year)
            ->sum('type_adhesions.prix');

        // Previous month stats
        $previousMonthAdhesions = Adhesion::whereMonth('date_debut', $previousMonth->month)
            ->whereYear('date_debut', $previousMonth->year)
            ->count();

        $previousMonthRevenue = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->whereMonth('adhesions.date_debut', $previousMonth->month)
            ->whereYear('adhesions.date_debut', $previousMonth->year)
            ->sum('type_adhesions.prix');

        // Calculate growth percentages
        $memberGrowth = $previousMonthAdhesions > 0 
            ? round((($currentMonthAdhesions - $previousMonthAdhesions) / $previousMonthAdhesions) * 100, 1)
            : ($currentMonthAdhesions > 0 ? 100 : 0);

        $revenueGrowth = $previousMonthRevenue > 0 
            ? round((($currentMonthRevenue - $previousMonthRevenue) / $previousMonthRevenue) * 100, 1)
            : ($currentMonthRevenue > 0 ? 100 : 0);

        // Total member growth (this month vs last month total)
        $previousTotalMembers = Adherents::whereDate('created_at', '<', $currentMonth->startOfMonth())->count();
        $totalGrowth = $previousTotalMembers > 0 
            ? round((($totalAdherents - $previousTotalMembers) / $previousTotalMembers) * 100, 1)
            : 0;

        $growthData = [
            'totalGrowth' => $totalGrowth,
            'newMembersGrowth' => $memberGrowth,
            'revenueGrowth' => $revenueGrowth,
        ];

        // Expiring memberships (next 30 days)
        $expiringMemberships = Adhesion::with(['adherent', 'typeAdhesion'])
            ->where('date_fin', '>=', Carbon::now()->format('Y-m-d'))
            ->where('date_fin', '<=', Carbon::now()->addDays(30)->format('Y-m-d'))
            ->orderBy('date_fin')
            ->get();

        // Monthly statistics for comparison
        $monthlyStats = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthStart = $date->copy()->startOfMonth()->format('Y-m-d');
            $monthEnd = $date->copy()->endOfMonth()->format('Y-m-d');
            
            $monthRevenue = DB::table('adhesions')
                ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
                ->whereBetween('adhesions.date_debut', [$monthStart, $monthEnd])
                ->sum('type_adhesions.prix');

            $monthMembers = Adhesion::whereBetween('date_debut', [$monthStart, $monthEnd])->count();

            $monthlyStats[] = [
                'month' => $date->format('M'),
                'year' => $date->format('Y'),
                'revenue' => (float) $monthRevenue,
                'members' => (int) $monthMembers,
                'date' => $date->format('Y-m'),
            ];
        }

        // Top performing membership types
        $topMembershipTypes = DB::table('type_adhesions')
            ->leftJoin('adhesions', 'type_adhesions.id', '=', 'adhesions.type_adhesion_id')
            ->select(
                'type_adhesions.nom',
                'type_adhesions.prix',
                'type_adhesions.duree',
                DB::raw('COUNT(adhesions.id) as total_sales'),
                DB::raw('SUM(type_adhesions.prix) as total_revenue')
            )
            ->groupBy('type_adhesions.id', 'type_adhesions.nom', 'type_adhesions.prix', 'type_adhesions.duree')
            ->orderByDesc('total_revenue')
            ->get();

        return Inertia::render('Dashboard', [
            // Basic stats
            'totalAdherents' => $totalAdherents,
            'totalAdhesions' => $totalAdhesions,
            'totalMontant' => (float) $totalMontant,
            'activeMemberships' => $activeMemberships,
            
            // Recent data
            'recentAdhesions' => $recentAdhesions,
            
            // Chart data
            'chartData' => $chartData,
            'monthlyStats' => $monthlyStats,
            
            // Membership analysis
            'membershipTypes' => $membershipTypesData,
            'topMembershipTypes' => $topMembershipTypes,
            
            // Growth metrics
            'growthData' => $growthData,
            
            // Alerts and notifications
            'expiringMemberships' => $expiringMemberships,
            'expiringCount' => $expiringMemberships->count(),
            
            // Additional metrics
            'currentMonthRevenue' => (float) $currentMonthRevenue,
            'currentMonthAdhesions' => $currentMonthAdhesions,
            'averageRevenuePerMember' => $totalAdhesions > 0 ? round($totalMontant / $totalAdhesions, 2) : 0,
            
            // Timestamps
            'lastUpdated' => Carbon::now()->toISOString(),
            'dataRange' => [
                'start' => Carbon::now()->subMonths(6)->format('Y-m-d'),
                'end' => Carbon::now()->format('Y-m-d'),
            ],
        ]);
    }

    /**
     * Get real-time dashboard metrics via AJAX
     */
    public function metrics()
    {
        $totalAdherents = Adherents::count();
        $activeMemberships = Adhesion::where('date_fin', '>=', Carbon::now()->format('Y-m-d'))->count();
        $expiringThisWeek = Adhesion::where('date_fin', '>=', Carbon::now()->format('Y-m-d'))
            ->where('date_fin', '<=', Carbon::now()->addDays(7)->format('Y-m-d'))
            ->count();

        return response()->json([
            'totalAdherents' => $totalAdherents,
            'activeMemberships' => $activeMemberships,
            'expiringThisWeek' => $expiringThisWeek,
            'timestamp' => Carbon::now()->toISOString(),
        ]);
    }
}