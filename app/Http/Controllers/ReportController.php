<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Adherents;
use App\Models\Adhesion;
use App\Models\TypeAdhesion;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Validate and sanitize date inputs
        $startDate = $this->validateDate($request->get('start_date', Carbon::now()->subDays(30)->format('Y-m-d')));
        $endDate = $this->validateDate($request->get('end_date', Carbon::now()->format('Y-m-d')));
        
        // Ensure start date is not after end date
        if (Carbon::parse($startDate)->gt(Carbon::parse($endDate))) {
            $temp = $startDate;
            $startDate = $endDate;
            $endDate = $temp;
        }
        
        return Inertia::render('Reports/Index', [
            'summary' => $this->getSummaryData($startDate, $endDate),
            'chartData' => $this->getChartData($startDate, $endDate),
            'membershipTypes' => $this->getMembershipTypesData($startDate, $endDate),
            'recentAdhesions' => $this->getRecentAdhesions(),
            'expiringMemberships' => $this->getExpiringMemberships(),
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate
            ]
        ]);
    }

    private function validateDate($date)
    {
        try {
            return Carbon::parse($date)->format('Y-m-d');
        } catch (\Exception $e) {
            return Carbon::now()->format('Y-m-d');
        }
    }

    private function getSummaryData($startDate, $endDate)
    {
        // Get total members count
        $totalAdherents = Adherents::count();
        
        // Get new memberships in date range
        $newMemberships = Adhesion::whereBetween('date_debut', [$startDate, $endDate])->count();
        
        // Get currently active memberships (not expired) - SQLite date comparison
        $activeMemberships = Adhesion::where('date_fin', '>=', Carbon::now()->format('Y-m-d'))->count();
        
        // Calculate revenue for the period using JOIN for better performance (SQLite optimized)
        $revenueData = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->whereBetween('adhesions.date_debut', [$startDate, $endDate])
            ->select(
                DB::raw('SUM(CAST(type_adhesions.prix AS REAL)) as total_revenue'),
                DB::raw('COUNT(*) as total_count'),
                DB::raw('AVG(CAST(type_adhesions.prix AS REAL)) as average_price')
            )
            ->first();

        $totalRevenue = (float) ($revenueData->total_revenue ?? 0);
        $averagePrice = (float) ($revenueData->average_price ?? 0);
        
        // Get memberships expiring this month - SQLite date handling
        $currentMonth = Carbon::now();
        $monthStart = $currentMonth->copy()->startOfMonth()->format('Y-m-d');
        $monthEnd = $currentMonth->copy()->endOfMonth()->format('Y-m-d');
        
        $expiringThisMonth = Adhesion::whereBetween('date_fin', [$monthStart, $monthEnd])->count();

        // Calculate growth rate compared to previous period
        $daysDiff = Carbon::parse($endDate)->diffInDays(Carbon::parse($startDate));
        $previousPeriodStart = Carbon::parse($startDate)->subDays($daysDiff)->format('Y-m-d');
        $previousPeriodNewMemberships = Adhesion::whereBetween('date_debut', [$previousPeriodStart, $startDate])->count();
        
        $growthRate = 0;
        if ($previousPeriodNewMemberships > 0) {
            $growthRate = (($newMemberships - $previousPeriodNewMemberships) / $previousPeriodNewMemberships) * 100;
        }

        return [
            'totalAdherents' => $totalAdherents,
            'newMemberships' => $newMemberships,
            'activeMemberships' => $activeMemberships,
            'totalRevenue' => $totalRevenue,
            'expiringThisMonth' => $expiringThisMonth,
            'averagePrice' => $averagePrice,
            'growthRate' => round($growthRate, 2)
        ];
    }

    private function getChartData($startDate, $endDate)
    {
        // SQLite-optimized query
        $chartData = DB::table('adhesions')
            ->join('type_adhesions', 'adhesions.type_adhesion_id', '=', 'type_adhesions.id')
            ->whereBetween('adhesions.date_debut', [$startDate, $endDate])
            ->select(
                'adhesions.date_debut as date',
                DB::raw('COUNT(*) as new_memberships'),
                DB::raw('SUM(CAST(type_adhesions.prix AS REAL)) as daily_revenue')
            )
            ->groupBy('adhesions.date_debut')
            ->orderBy('adhesions.date_debut')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'new_memberships' => (int) $item->new_memberships,
                    'daily_revenue' => (float) ($item->daily_revenue ?? 0)
                ];
            });

        // Fill missing dates with zero values
        $period = Carbon::parse($startDate)->daysUntil($endDate);
        $filledData = [];
        $chartDataByDate = $chartData->keyBy('date');

        foreach ($period as $date) {
            $dateKey = $date->format('Y-m-d');
            $filledData[] = $chartDataByDate->get($dateKey, [
                'date' => $dateKey,
                'new_memberships' => 0,
                'daily_revenue' => 0.0
            ]);
        }

        return $filledData;
    }

    private function getMembershipTypesData($startDate, $endDate)
    {
        $membershipTypesData = DB::table('type_adhesions')
            ->leftJoin('adhesions', function($join) use ($startDate, $endDate) {
                $join->on('type_adhesions.id', '=', 'adhesions.type_adhesion_id')
                     ->whereBetween('adhesions.date_debut', [$startDate, $endDate]);
            })
            ->select(
                'type_adhesions.id',
                'type_adhesions.nom',
                'type_adhesions.prix',
                'type_adhesions.duree',
                DB::raw('COUNT(adhesions.id) as period_count'),
                DB::raw('SUM(CAST(type_adhesions.prix AS REAL)) as total_revenue')
            )
            ->groupBy('type_adhesions.id', 'type_adhesions.nom', 'type_adhesions.prix', 'type_adhesions.duree')
            ->get();

        $totalRevenue = $membershipTypesData->sum('total_revenue');

        return $membershipTypesData->map(function ($type) use ($totalRevenue) {
            return [
                'id' => $type->id,
                'nom' => $type->nom,
                'prix' => (float) $type->prix,
                'duree' => $type->duree,
                'total_count' => (int) $type->period_count,
                'total_revenue' => (float) ($type->total_revenue ?? 0),
                'percentage' => $totalRevenue > 0 ? round((($type->total_revenue ?? 0) / $totalRevenue) * 100, 2) : 0
            ];
        })
        ->sortByDesc('total_revenue')
        ->values()
        ->toArray();
    }

    private function getRecentAdhesions()
    {
        return Adhesion::with(['adherent:id,nom,prenom,email', 'typeAdhesion:id,nom,prix,duree'])
            ->latest('created_at')
            ->limit(10)
            ->get()
            ->map(function ($adhesion) {
                // Check if relationships exist to prevent errors
                if (!$adhesion->adherent || !$adhesion->typeAdhesion) {
                    return null;
                }

                return [
                    'id' => $adhesion->id,
                    'adherent' => [
                        'id' => $adhesion->adherent->id,
                        'nom' => $adhesion->adherent->nom ?? '',
                        'prenom' => $adhesion->adherent->prenom ?? '',
                        'email' => $adhesion->adherent->email ?? '',
                        'full_name' => ($adhesion->adherent->prenom ?? '') . ' ' . ($adhesion->adherent->nom ?? '')
                    ],
                    'type_adhesion' => [
                        'id' => $adhesion->typeAdhesion->id,
                        'nom' => $adhesion->typeAdhesion->nom ?? '',
                        'prix' => (float) ($adhesion->typeAdhesion->prix ?? 0),
                        'duree' => $adhesion->typeAdhesion->duree ?? 0,
                    ],
                    'date_debut' => $this->formatDate($adhesion->date_debut, 'Y-m-d'),
                    'date_fin' => $this->formatDate($adhesion->date_fin, 'Y-m-d'),
                    'created_at' => $this->formatDate($adhesion->created_at, 'Y-m-d H:i:s'),
                    'formatted_created_at' => $this->formatDate($adhesion->created_at, 'd/m/Y à H:i')
                ];
            })
            ->filter() // Remove null entries
            ->values()
            ->toArray();
    }

    private function getExpiringMemberships()
    {
        $now = Carbon::now();
        $thirtyDaysFromNow = $now->copy()->addDays(30);
        
        return Adhesion::with([
                'adherent:id,nom,prenom,email,telephone', 
                'typeAdhesion:id,nom,prix'
            ])
            ->where('date_fin', '>=', $now->format('Y-m-d'))
            ->where('date_fin', '<=', $thirtyDaysFromNow->format('Y-m-d'))
            ->orderBy('date_fin')
            ->get()
            ->map(function ($adhesion) use ($now) {
                // Check if relationships exist
                if (!$adhesion->adherent || !$adhesion->typeAdhesion || !$adhesion->date_fin) {
                    return null;
                }

                $expirationDate = Carbon::parse($adhesion->date_fin);
                $daysLeft = $now->diffInDays($expirationDate, false);
                
                // Handle negative days (already expired but within our query range)
                if ($daysLeft < 0) {
                    $daysLeft = 0;
                }
                
                return [
                    'id' => $adhesion->id,
                    'adherent' => [
                        'id' => $adhesion->adherent->id,
                        'nom' => $adhesion->adherent->nom ?? '',
                        'prenom' => $adhesion->adherent->prenom ?? '',
                        'email' => $adhesion->adherent->email ?? '',
                        'telephone' => $adhesion->adherent->telephone ?? '',
                        'full_name' => ($adhesion->adherent->prenom ?? '') . ' ' . ($adhesion->adherent->nom ?? '')
                    ],
                    'type_adhesion' => [
                        'nom' => $adhesion->typeAdhesion->nom ?? '',
                        'prix' => (float) ($adhesion->typeAdhesion->prix ?? 0),
                    ],
                    'date_fin' => $this->formatDate($adhesion->date_fin, 'Y-m-d'),
                    'formatted_date_fin' => $this->formatDate($adhesion->date_fin, 'd/m/Y'),
                    'days_left' => (int) $daysLeft,
                    'is_urgent' => $daysLeft <= 7,
                    'is_critical' => $daysLeft <= 3,
                    'status' => $this->getExpirationStatus($daysLeft)
                ];
            })
            ->filter() // Remove null entries
            ->values()
            ->toArray();
    }

    private function formatDate($date, $format = 'Y-m-d')
    {
        if (!$date) {
            return null;
        }

        // If it's already a string, try to parse it first
        if (is_string($date)) {
            try {
                return Carbon::parse($date)->format($format);
            } catch (\Exception $e) {
                return $date; // Return as-is if parsing fails
            }
        }

        // If it's a Carbon instance
        if ($date instanceof Carbon) {
            return $date->format($format);
        }

        // If it's a DateTime instance
        if ($date instanceof \DateTime) {
            return $date->format($format);
        }

        return null;
    }

    private function getExpirationStatus($daysLeft)
    {
        if ($daysLeft <= 0) {
            return 'expired';
        } elseif ($daysLeft <= 3) {
            return 'critical';
        } elseif ($daysLeft <= 7) {
            return 'urgent';
        } elseif ($daysLeft <= 14) {
            return 'warning';
        } else {
            return 'normal';
        }
    }

    // Additional helper method for exporting data
    public function export(Request $request)
    {
        $startDate = $this->validateDate($request->get('start_date', Carbon::now()->subDays(30)->format('Y-m-d')));
        $endDate = $this->validateDate($request->get('end_date', Carbon::now()->format('Y-m-d')));
        
        $data = [
            'summary' => $this->getSummaryData($startDate, $endDate),
            'membershipTypes' => $this->getMembershipTypesData($startDate, $endDate),
            'recentAdhesions' => $this->getRecentAdhesions(),
            'expiringMemberships' => $this->getExpiringMemberships(),
            'generated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'period' => [
                'start_date' => $startDate,
                'end_date' => $endDate
            ]
        ];

        return response()->json($data);
    }
}