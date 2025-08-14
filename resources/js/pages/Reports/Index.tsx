import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart
} from 'recharts';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rapports',
        href: '/reports',
    },
];

// TypeScript interfaces
interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
}

interface TypeAdhesion {
  id: number;
  nom: string;
  prix: number;
  duree: number;
}

interface Summary {
  totalAdherents: number;
  newMemberships: number;
  activeMemberships: number;
  totalRevenue: number;
  expiringThisMonth: number;
  averagePrice: number;
}

interface ChartDataPoint {
  date: string;
  new_memberships: number;
  daily_revenue: number;
}

interface MembershipType {
  id: number;
  nom: string;
  prix: number;
  duree: number;
  total_count: number;
  total_revenue: number;
  percentage: number;
}

interface RecentAdhesion {
  id: number;
  adherent: Adherent;
  type_adhesion: TypeAdhesion;
  date_debut: string;
  date_fin: string;
  created_at: string;
}

interface ExpiringMembership {
  id: number;
  adherent: Adherent;
  type_adhesion: {
    nom: string;
    prix: number;
  };
  date_fin: string;
  days_left: number;
  is_urgent: boolean;
}

interface Filters {
  start_date: string;
  end_date: string;
}

interface Props {
  summary: Summary;
  chartData: ChartDataPoint[];
  membershipTypes: MembershipType[];
  recentAdhesions: RecentAdhesion[];
  expiringMemberships: ExpiringMembership[];
  filters: Filters;
}

export default function ReportsIndex() {
  const { summary, chartData, membershipTypes, recentAdhesions, expiringMemberships, filters } = usePage<Props>().props;
  
  const [startDate, setStartDate] = useState<string>(filters.start_date);
  const [endDate, setEndDate] = useState<string>(filters.end_date);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    router.get('/reports', {
      start_date: startDate,
      end_date: endDate
    }, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setLoading(false)
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('fr-MA').format(value);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getUrgencyBadge = (daysLeft: number): { color: string; text: string } => {
    if (daysLeft <= 3) return { color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300', text: 'Urgent' };
    if (daysLeft <= 7) return { color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300', text: 'Bientôt' };
    return { color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300', text: `${daysLeft}j` };
  };

  // Calculate percentages for membership types
  const membershipTypesWithPercentage = membershipTypes.map(type => ({
    ...type,
    percentage: summary.newMemberships > 0 ? (type.total_count / summary.newMemberships) * 100 : 0
  }));

  const COLORS = ['#14B8A6', '#0EA5E9', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const StatCard = ({ title, value, icon: Icon, color, subtitle }: {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  subtitle?: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
            {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Rapports - Adhésions" />
      
      <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Tableau de Bord</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Analyse complète des adhésions et revenus</p>
            </div>
            <div className="flex items-center gap-3">
              <ChartBarIcon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Période: {formatDate(filters.start_date)} - {formatDate(filters.end_date)}</span>
            </div>
          </div>

          {/* Date Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <CalendarIcon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrer par période</h3>
            </div>
            <form onSubmit={handleDateFilter} className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Chargement...
                  </>
                ) : (
                  'Appliquer'
                )}
              </Button>
            </form>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <StatCard
              title="Total Adhérents"
              value={formatNumber(summary.totalAdherents)}
              icon={UserGroupIcon}
              color="bg-blue-500"
            />
            
            <StatCard
              title="Adhésions Actives"
              value={formatNumber(summary.activeMemberships)}
              icon={UserGroupIcon}
              color="bg-teal-500"
            />
            <StatCard
              title="Revenus Totaux"
              value={formatCurrency(summary.totalRevenue)}
              icon={CurrencyDollarIcon}
              color="bg-purple-500"
            />
            <StatCard
              title="Prix Moyen"
              value={formatCurrency(summary.averagePrice)}
              icon={ChartBarIcon}
              color="bg-indigo-500"
            />
            <StatCard
              title="Expirations"
              value={formatNumber(summary.expiringThisMonth)}
              icon={ExclamationTriangleIcon}
              color="bg-red-500"
              subtitle="Ce mois"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Trends Chart */}
            <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Évolution des Adhésions et Revenus</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(156 163 175 / 0.3)" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }}
                      tickFormatter={(value) => formatDate(value)}
                      axisLine={{ stroke: 'rgb(156 163 175 / 0.5)' }}
                    />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} axisLine={{ stroke: 'rgb(156 163 175 / 0.5)' }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} axisLine={{ stroke: 'rgb(156 163 175 / 0.5)' }} />
                    <Tooltip 
                      labelFormatter={(value) => formatDate(value)}
                      formatter={(value: number, name: string) => [
                        name === 'daily_revenue' ? formatCurrency(value) : formatNumber(value), 
                        name === 'daily_revenue' ? 'Revenus' : 'Nouvelles Adhésions'
                      ]}
                      contentStyle={{
                        backgroundColor: 'rgb(31 41 55)',
                        border: '1px solid rgb(75 85 99)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        color: 'white'
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="new_memberships" 
                      fill="#14B8A6" 
                      name="Nouvelles Adhésions"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="daily_revenue" 
                      stroke="#0EA5E9" 
                      strokeWidth={3}
                      name="Revenus"
                      dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Répartition par Type</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipTypesWithPercentage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ nom, percentage }) => percentage > 8 ? `${percentage.toFixed(0)}%` : ''}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="total_count"
                    >
                      {membershipTypesWithPercentage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [formatNumber(value), 'Adhésions']}
                      contentStyle={{
                        backgroundColor: 'rgb(31 41 55)',
                        border: '1px solid rgb(75 85 99)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Membership Types Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Performance par Type • {membershipTypes.length} types
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nombre</th>
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Revenus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {membershipTypesWithPercentage.map((type, index) => (
                      <tr key={type.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{type.nom}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(type.prix)} • {type.duree} jours</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{formatNumber(type.total_count)}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{type.percentage.toFixed(1)}%</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(type.total_revenue)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Memberships */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Adhésions Récentes • {recentAdhesions.length} dernières
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Adhérent</th>
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                      <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Période</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {recentAdhesions.map((adhesion) => (
                      <tr key={adhesion.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {adhesion.adherent.nom} {adhesion.adherent.prenom}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{adhesion.adherent.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="text-sm text-gray-900 dark:text-white">{adhesion.type_adhesion.nom}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(adhesion.type_adhesion.prix)}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <div>Du {formatDate(adhesion.date_debut)}</div>
                            <div>Au {formatDate(adhesion.date_fin)}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Expiring Memberships Alert */}
          {expiringMemberships.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Adhésions Expirant Bientôt</h3>
                  <p className="text-sm text-red-600 dark:text-red-400">Contactez ces adhérents pour renouveler leur adhésion</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expiringMemberships.slice(0, 6).map((expiring) => {
                  const urgency = getUrgencyBadge(expiring.days_left);
                  return (
                    <div 
                      key={expiring.id} 
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-400 dark:border-red-500 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {expiring.adherent.nom} {expiring.adherent.prenom}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{expiring.adherent.email}</div>
                          {expiring.adherent.telephone && (
                            <div className="text-sm text-gray-600 dark:text-gray-300">{expiring.adherent.telephone}</div>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.color}`}>
                          {urgency.text}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{expiring.type_adhesion.nom}</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {formatDate(expiring.date_fin)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {expiringMemberships.length > 6 && (
                <div className="mt-4 p-3 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-lg">
                  <div className="text-sm text-red-700 dark:text-red-300 font-medium">
                    Et {expiringMemberships.length - 6} autres adhésions expirant bientôt...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}