import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, MoreHorizontal, CreditCard, TrendingUp, Circle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardProps = {
    totalAdherents: number;
    totalAdhesions: number;
    totalMontant: number;
    recentAdhesions: { id: number; adherent: string; type: string; date_debut: string }[];
};

export default function Dashboard({ totalAdherents, totalAdhesions, totalMontant, recentAdhesions }: DashboardProps) {
    const [selectedMonth, setSelectedMonth] = useState('April');
    const [selectedYear, setSelectedYear] = useState('2021');

    // Mock data for charts based on the Figma design
    const evolutionData = [
        { month: 'Jan', value: 2800 },
        { month: 'Feb', value: 3200 },
        { month: 'Mar', value: 2900 },
        { month: 'Apr', value: 3400 },
        { month: 'May', value: 3100 },
        { month: 'Jun', value: 3600 },
    ];

    const pieData = [
        { name: 'Adhésion Standard', value: 63, color: '#3B82F6' },
        { name: 'Adhésion Premium', value: 12, color: '#1E40AF' },
        { name: 'Adhésion Famille', value: 25, color: '#60A5FA' },
    ];

    const tasks = [
        { id: 1, title: 'Contact Expiring Members', completed: false },
        { id: 2, title: 'Resolve Payment Issues', completed: true },
        { id: 3, title: 'Update Membership Pricing', completed: false },
        { id: 4, title: 'Run Membership Analytics', completed: true },
    ];

    // Calendar data
    const currentDate = new Date();
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    const highlightedDates = [15, 22];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 pl-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                    
                    </div>
                </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Total members</p>
                                        <p className="text-2xl font-bold">{totalAdherents}</p>
                                    </div>
                                </div>
                                <span className="text-green-500 text-sm font-medium">+8%</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">New members</p>
                                        <p className="text-2xl font-bold">{totalAdhesions}</p>
                                    </div>
                                </div>
                                <span className="text-red-500 text-sm font-medium">-4%</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Active membership</p>
                                        <p className="text-2xl font-bold">{totalMontant}€</p>
                                    </div>
                                </div>
                                <span className="text-green-500 text-sm font-medium">+16%</span>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Evolution Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Évolution des Adhésions</h3>
                                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                                    <option>Last 6 months</option>
                                </select>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={evolutionData}>
                                    <defs>
                                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} fill="url(#colorGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-6">Répartition des Types d'Adhésion</h3>
                            <div className="flex items-center">
                                <ResponsiveContainer width="60%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-3">
                                    {pieData.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                                            <span className="text-sm text-gray-600">{item.name}</span>
                                            <span className="text-sm font-medium">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Tasks */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Tasks</h3>
                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {tasks.map((task) => (
                                    <div key={task.id} className="flex items-center space-x-3">
                                        {task.completed ? (
                                            <CheckCircle className="w-5 h-5 text-cyan-500" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-300" />
                                        )}
                                        <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                            {task.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">{selectedMonth}</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{selectedYear}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                    <div key={day} className="text-center text-xs text-gray-500 py-2">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.slice(0, 28).map(day => (
                                    <div
                                        key={day}
                                        className={`text-center text-sm py-2 cursor-pointer rounded ${
                                            highlightedDates.includes(day)
                                                ? 'bg-cyan-500 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Memberships */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Renouvellements à Venir</h3>
                                <button className="text-cyan-500 text-sm font-medium">View All</button>
                            </div>
                            <div className="space-y-4">
                                {recentAdhesions.slice(0, 3).map((adhesion) => (
                                    <div key={adhesion.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-sm">{adhesion.adherent}</p>
                                                <p className="text-xs text-gray-500">{adhesion.type}</p>
                                                <p className="text-xs text-gray-400">{adhesion.date_debut}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    Approved
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </AppLayout>
    );
}