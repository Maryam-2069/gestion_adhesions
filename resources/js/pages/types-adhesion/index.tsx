import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Types d'adhésion",
        href: '/types-adhesion',
    },
];

interface TypeAdhesion {
    id: number;
    nom: string;
    duree: number;
    prix: number;
}

interface Props {
    type_adhesions: TypeAdhesion[];
}

export default function Index() {
    const { type_adhesions } = usePage<Props>().props;

    const handleEdit = (id: number) => {
        router.visit(`/types-adhesion/${id}/edit`);
    };

    const handleDelete = (id: number, nom: string) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le type "${nom}" ?`)) {
            router.delete(`/types-adhesion/${id}`);
        }
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format duration
    const formatDuration = (months: number) => {
        if (months === 1) return '1 mois';
        if (months < 12) return `${months} mois`;
        if (months === 12) return '1 an';
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`;
        return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Types d'adhésion" />

            <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Types d'adhésion</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les types d'adhésion disponibles</p>
                        </div>
                        <Link href="/types-adhesion/create">
                            <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200">
                                <PlusIcon className="h-4 w-4" />
                                Nouveau type
                            </Button>
                        </Link>
                    </div>

                    {type_adhesions.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Liste des types • {type_adhesions.length} total
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700">
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Nom
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Durée
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Prix
                                            </th>
                                            <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {type_adhesions.map((type) => (
                                            <tr key={type.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg text-sm font-medium">
                                                        {type.id}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {type.nom}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center space-x-2">
                                                            <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                                {formatDuration(type.duree)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center space-x-2">
                                                            
                                                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                                                {formatCurrency(type.prix)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button 
                                                            onClick={() => handleEdit(type.id)} 
                                                            className="inline-flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-200"
                                                            title="Modifier"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button 
                                                            onClick={() => handleDelete(type.id, type.nom)} 
                                                            className="inline-flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                                                            title="Supprimer"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m2 0a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2m10 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                Aucun type trouvé
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                                Commencez par ajouter un type d'adhésion pour voir la liste ici
                            </p>
                            <Link href="/types-adhesion/create">
                                <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                                    <PlusIcon className="h-5 w-5" />
                                    Créer un type
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}