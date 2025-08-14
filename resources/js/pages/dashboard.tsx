import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Users, FileText, DollarSign, Calendar, CheckCircle, Clock, AlertCircle, MoreHorizontal, CreditCard, TrendingUp, Circle, ChevronDown, RefreshCw, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
    Cell,
    BarChart,
    Bar
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Task = {
    id: number;
    title: string;
    completed: boolean;
    urgent: boolean;
    createdAt: string;
    dueDate?: string;
};

type DashboardProps = {
    totalAdherents: number;
    totalAdhesions: number;
    totalMontant: number;
    recentAdhesions: { 
        id: number; 
        adherent: string; 
        type: string; 
        date_debut: string;
        status?: string;
        montant?: number;
    }[];
    chartData?: { month: string; value: number; membres: number }[];
    membershipTypes?: { name: string; value: number; color: string; count: number }[];
    growthData?: { totalGrowth: number; newMembersGrowth: number; revenueGrowth: number };
};

export default function Dashboard({ 
    totalAdherents, 
    totalAdhesions, 
    totalMontant, 
    recentAdhesions,
    chartData,
    membershipTypes,
    growthData
}: DashboardProps) {
    const [selectedPeriod, setSelectedPeriod] = useState('6months');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('evolution');
    const [refreshKey, setRefreshKey] = useState(0);

    // Task Management State
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskUrgent, setNewTaskUrgent] = useState(false);
    const [showTaskMenu, setShowTaskMenu] = useState<number | null>(null);

    // Initialize tasks on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('dashboard-tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            // Generate initial tasks based on data
            const initialTasks: Task[] = [
                { 
                    id: 1, 
                    title: `Contact ${recentAdhesions.filter(a => a.status === 'expiring').length || 0} Expiring Members`, 
                    completed: false,
                    urgent: recentAdhesions.filter(a => a.status === 'expiring').length > 5,
                    createdAt: new Date().toISOString(),
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
                },
                { 
                    id: 2, 
                    title: 'Process Pending Payments', 
                    completed: totalMontant > 0,
                    urgent: false,
                    createdAt: new Date().toISOString()
                },
                { 
                    id: 3, 
                    title: 'Update Membership Analytics', 
                    completed: false,
                    urgent: false,
                    createdAt: new Date().toISOString()
                },
                { 
                    id: 4, 
                    title: `Review ${totalAdhesions} New Applications`, 
                    completed: totalAdhesions < 5,
                    urgent: totalAdhesions > 10,
                    createdAt: new Date().toISOString()
                },
            ];
            setTasks(initialTasks);
            localStorage.setItem('dashboard-tasks', JSON.stringify(initialTasks));
        }
    }, [totalAdherents, totalAdhesions, totalMontant, recentAdhesions]);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('dashboard-tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Task Management Functions
    const toggleTaskCompletion = (taskId: number) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    const addNewTask = () => {
        if (newTaskTitle.trim()) {
            const newTask: Task = {
                id: Date.now(), // Simple ID generation
                title: newTaskTitle.trim(),
                completed: false,
                urgent: newTaskUrgent,
                createdAt: new Date().toISOString()
            };
            setTasks(prev => [...prev, newTask]);
            setNewTaskTitle('');
            setNewTaskUrgent(false);
            setShowAddTask(false);
        }
    };

    const deleteTask = (taskId: number) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        setShowTaskMenu(null);
    };

    const toggleTaskUrgency = (taskId: number) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId 
                ? { ...task, urgent: !task.urgent }
                : task
        ));
        setShowTaskMenu(null);
    };

    // Real-time data refresh
    const refreshData = () => {
        setIsLoading(true);
        router.reload({
            preserveState: false,
            preserveScroll: true,
            onFinish: () => {
                setIsLoading(false);
                setRefreshKey(prev => prev + 1);
            }
        });
    };

    // Auto refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(refreshData, 30000);
        return () => clearInterval(interval);
    }, []);

    // Dynamic chart data based on props or fallback
    const evolutionData = chartData || [
        { month: 'Jan', value: totalMontant * 0.6, membres: Math.floor(totalAdherents * 0.7) },
        { month: 'Feb', value: totalMontant * 0.7, membres: Math.floor(totalAdherents * 0.8) },
        { month: 'Mar', value: totalMontant * 0.8, membres: Math.floor(totalAdherents * 0.85) },
        { month: 'Apr', value: totalMontant * 0.9, membres: Math.floor(totalAdherents * 0.9) },
        { month: 'May', value: totalMontant * 0.95, membres: Math.floor(totalAdherents * 0.95) },
        { month: 'Jun', value: totalMontant, membres: totalAdherents },
    ];

    // Dynamic pie data
    const pieData = membershipTypes || [
        { name: 'Standard', value: 60, color: '#3B82F6', count: Math.floor(totalAdhesions * 0.6) },
        { name: 'Premium', value: 25, color: '#1E40AF', count: Math.floor(totalAdhesions * 0.25) },
        { name: 'Famille', value: 15, color: '#60A5FA', count: Math.floor(totalAdhesions * 0.15) },
    ];

    // Dynamic growth calculations
    const growth = growthData || {
        totalGrowth: Math.floor(Math.random() * 20) - 5,
        newMembersGrowth: Math.floor(Math.random() * 30) - 10,
        revenueGrowth: Math.floor(Math.random() * 25) - 5,
    };

    // Calendar with dynamic events
    const currentDate = new Date();
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    const highlightedDates = recentAdhesions
        .map(a => new Date(a.date_debut).getDate())
        .filter(day => day <= 30);

    // Format currency dynamically
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format numbers
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-MA').format(num);
    };

    // Get growth indicator
    const getGrowthIndicator = (growth: number) => {
        if (growth > 0) return { color: 'text-green-500 dark:text-green-400', symbol: '+', bg: 'bg-green-50 dark:bg-green-900/20' };
        if (growth < 0) return { color: 'text-red-500 dark:text-red-400', symbol: '', bg: 'bg-red-50 dark:bg-red-900/20' };
        return { color: 'text-gray-500 dark:text-gray-400', symbol: '±', bg: 'bg-gray-50 dark:bg-gray-800' };
    };

    // Get task stats
    const completedTasks = tasks.filter(task => task.completed).length;
    const urgentTasks = tasks.filter(task => task.urgent && !task.completed).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:pl-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Aperçu temps réel • Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <select 
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="text-xs sm:text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                        >
                            <option value="1month">1 mois</option>
                            <option value="3months">3 mois</option>
                            <option value="6months">6 mois</option>
                            <option value="1year">1 an</option>
                        </select>
                        <button 
                            onClick={refreshData}
                            disabled={isLoading}
                            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 bg-cyan-500 dark:bg-cyan-600 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-colors text-xs sm:text-sm disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Actualiser</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Total membres</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalAdherents)}</p>
                                </div>
                            </div>
                            <div className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${getGrowthIndicator(growth.totalGrowth).bg} ${getGrowthIndicator(growth.totalGrowth).color}`}>
                                {getGrowthIndicator(growth.totalGrowth).symbol}{Math.abs(growth.totalGrowth)}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Nouvelles adhésions</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(totalAdhesions)}</p>
                                </div>
                            </div>
                            <div className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${getGrowthIndicator(growth.newMembersGrowth).bg} ${getGrowthIndicator(growth.newMembersGrowth).color}`}>
                                {getGrowthIndicator(growth.newMembersGrowth).symbol}{Math.abs(growth.newMembersGrowth)}%
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Revenus totaux</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalMontant)}</p>
                                </div>
                            </div>
                            <div className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${getGrowthIndicator(growth.revenueGrowth).bg} ${getGrowthIndicator(growth.revenueGrowth).color}`}>
                                {getGrowthIndicator(growth.revenueGrowth).symbol}{Math.abs(growth.revenueGrowth)}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Evolution Chart */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Évolution des Adhésions</h3>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => setActiveTab('evolution')}
                                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                                        activeTab === 'evolution' 
                                            ? 'bg-cyan-500 dark:bg-cyan-600 text-white' 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    Revenus
                                </button>
                                <button 
                                    onClick={() => setActiveTab('members')}
                                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg transition-colors ${
                                        activeTab === 'members' 
                                            ? 'bg-cyan-500 dark:bg-cyan-600 text-white' 
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    Membres
                                </button>
                            </div>
                        </div>
                        <div className="h-48 sm:h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                {activeTab === 'evolution' ? (
                                    <AreaChart data={evolutionData}>
                                        <defs>
                                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(156 163 175 / 0.3)" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} 
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} 
                                        />
                                        <Tooltip 
                                            formatter={(value) => [formatCurrency(Number(value)), 'Revenus']}
                                            contentStyle={{
                                                backgroundColor: 'rgb(31 41 55)',
                                                border: '1px solid rgb(75 85 99)',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={2} fill="url(#colorGradient)" />
                                    </AreaChart>
                                ) : (
                                    <BarChart data={evolutionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(156 163 175 / 0.3)" />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} 
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} 
                                        />
                                        <Tooltip 
                                            formatter={(value) => [formatNumber(Number(value)), 'Membres']}
                                            contentStyle={{
                                                backgroundColor: 'rgb(31 41 55)',
                                                border: '1px solid rgb(75 85 99)',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }}
                                        />
                                        <Bar dataKey="membres" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Types d'Adhésion</h3>
                        <div className="flex flex-col lg:flex-row items-center">
                            <div className="w-full lg:w-3/5 h-48 sm:h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            formatter={(value) => [`${value}%`, 'Pourcentage']}
                                            contentStyle={{
                                                backgroundColor: 'rgb(31 41 55)',
                                                border: '1px solid rgb(75 85 99)',
                                                borderRadius: '8px',
                                                color: 'white'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full lg:w-2/5 space-y-2 sm:space-y-3 mt-4 lg:mt-0">
                                {pieData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">{formatNumber(item.count)} membres</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Functional Tasks */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Tâches</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {completedTasks}/{tasks.length} terminées
                                    {urgentTasks > 0 && (
                                        <span className="text-red-500 dark:text-red-400 ml-2">• {urgentTasks} urgente(s)</span>
                                    )}
                                </p>
                            </div>
                            <button 
                                onClick={() => setShowAddTask(true)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Add Task Form */}
                        {showAddTask && (
                            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <input
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="Nouvelle tâche..."
                                    className="w-full text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                                    onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
                                />
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={newTaskUrgent}
                                            onChange={(e) => setNewTaskUrgent(e.target.checked)}
                                            className="w-4 h-4 text-red-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-400"
                                        />
                                        <span className="text-xs text-gray-600 dark:text-gray-300">Urgent</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setShowAddTask(false)}
                                            className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            onClick={addNewTask}
                                            className="px-3 py-1 text-xs bg-cyan-500 dark:bg-cyan-600 text-white rounded hover:bg-cyan-600 dark:hover:bg-cyan-700 transition-colors"
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tasks List */}
                        <div className="space-y-3 sm:space-y-4 max-h-64 overflow-y-auto">
                            {tasks.map((task) => (
                                <div key={task.id} className={`flex items-start justify-between p-2 rounded-lg ${task.urgent && !task.completed ? 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30' : ''}`}>
                                    <div className="flex items-start space-x-3 flex-1">
                                        <button onClick={() => toggleTaskCompletion(task.id)}>
                                            {task.completed ? (
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600 mt-0.5 flex-shrink-0 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors" />
                                            )}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <span className={`text-xs sm:text-sm block ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : task.urgent ? 'text-red-700 dark:text-red-300 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                                                {task.title}
                                            </span>
                                            {task.urgent && !task.completed && (
                                                <span className="text-xs text-red-500 dark:text-red-400 font-medium">Urgent</span>
                                            )}
                                            {task.dueDate && !task.completed && (
                                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                                    Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowTaskMenu(showTaskMenu === task.id ? null : task.id)}
                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                        >
                                            <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                        </button>
                                        {showTaskMenu === task.id && (
                                            <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-32">
                                                <button
                                                    onClick={() => toggleTaskUrgency(task.id)}
                                                    className="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    {task.urgent ? 'Retirer urgence' : 'Marquer urgent'}
                                                </button>
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="w-full text-left px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {tasks.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Aucune tâche</p>
                                    <button
                                        onClick={() => setShowAddTask(true)}
                                        className="text-cyan-500 dark:text-cyan-400 text-xs mt-2 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                                    >
                                        Ajouter une tâche
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">{currentDate.toLocaleDateString('fr-FR', { month: 'long' })}</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{selectedYear}</span>
                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-4">
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
                                <div key={day} className="text-center text-xs text-gray-500 dark:text-gray-400 py-1 sm:py-2">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.slice(0, 28).map(day => (
                                <div
                                    key={day}
                                    className={`text-center text-xs sm:text-sm py-1 sm:py-2 cursor-pointer rounded transition-colors ${
                                        highlightedDates.includes(day)
                                            ? 'bg-cyan-500 dark:bg-cyan-600 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                        {highlightedDates.length > 0 && (
                            <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-3 text-center">
                                {highlightedDates.length} événement(s) ce mois
                            </p>
                        )}
                    </div>

                    {/* Recent Memberships */}
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Adhésions Récentes</h3>
                            <button 
                                onClick={() => router.visit('/adhesions')}
                                className="text-cyan-500 dark:text-cyan-400 text-xs sm:text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                            >
                                Voir tout
                            </button>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {recentAdhesions.slice(0, 4).map((adhesion) => (
                                <div key={adhesion.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 sm:pb-4 last:border-b-0">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white truncate">{adhesion.adherent}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{adhesion.type}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                {new Date(adhesion.date_debut).toLocaleDateString('fr-FR')}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end space-y-1">
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                adhesion.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                                adhesion.status === 'approved' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                                adhesion.status === 'approved' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                                'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                            }`}>
                                                {adhesion.status === 'approved' ? 'Approuvé' :
                                                 adhesion.status === 'approved' ? 'Approuvé' :
                                                 adhesion.status === 'approved' ? 'Approuvé' : 'Approuvé'}
                                            </span>
                                            {adhesion.montant && (
                                                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                    {formatCurrency(adhesion.montant)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Click outside to close task menu */}
                {showTaskMenu && (
                    <div 
                        className="fixed inset-0 z-0" 
                        onClick={() => setShowTaskMenu(null)}
                    />
                )}
            </div>
        </AppLayout>
    );
}