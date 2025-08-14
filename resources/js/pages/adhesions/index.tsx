import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adhésions',
        href: '/adhesions',
    },
];

interface Adhesion {
    id: number;
    type: string;
    montant: number;
    date_debut: string;
    date_fin: string;
    adherent_nom: string;
}

interface Props {
    adhesions: Adhesion[];
}

export default function Index() {
    const { adhesions } = usePage<Props>().props;

    const handleEdit = (id: number) => {
        router.visit(`/adhesions/${id}/edit`);
    };

    const handleDelete = (id: number, type: string) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer cette adhésion "${type}" ?`)) {
            router.delete(`/adhesions/${id}`);
        }
    };

  
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adhésions" />

            <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Adhésions</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gérez les adhésions des membres</p>
                        </div>
                        <Link href="/adhesions/create">
                            <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                <PlusIcon className="h-4 w-4" />
                                Nouvelle adhésion
                            </Button>
                        </Link>
                    </div>

                    {adhesions.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Liste des adhésions • {adhesions.length} total
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700">
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                ID
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                Type
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                Montant
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                Début
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                Fin
                                            </th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                Adhérent
                                            </th>
                                            <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase w-24">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {adhesions.map((adhesion) => (
                                            <tr key={adhesion.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg text-sm font-medium">
                                                        {adhesion.id}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {adhesion.type}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                                                        {formatCurrency(adhesion.montant)}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {adhesion.date_debut}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {adhesion.date_fin}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {adhesion.adherent_nom}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button 
                                                            onClick={() => handleEdit(adhesion.id)} 
                                                            className="inline-flex items-center justify-center w-8 h-8 text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-200"
                                                            title="Modifier"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button 
                                                            onClick={() => handleDelete(adhesion.id, adhesion.type)} 
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                Aucune adhésion trouvée
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                                Commencez par créer une première adhésion pour voir la liste ici
                            </p>
                            <Link href="/adhesions/create">
                                <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200">
                                    <PlusIcon className="h-5 w-5" />
                                    Créer la première adhésion
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}