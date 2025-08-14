import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Adherents',
        href: '/adherents',
    },
];

interface Adherent {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    cin: string;
    telephone: string;
}

interface props {
    adherents: Adherent[];
}

export default function Index() {
   const { adherents } = usePage<props>().props;

    const handleEdit = (id: number ) => {
        router.visit(`/adherents/${id}/edit`);
    };

   const handleDelete = (id: number , nom: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cet adhérent ${id} - ${nom} ?`)) {
        router.delete(`/adherents/${id}`);
    }
};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adherents" />
            
            <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                                Adhérents
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Gérez vos adhérents et leurs informations
                            </p>
                        </div>
                        <Link href="/adherents/create">
                            <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                <PlusIcon className="h-4 w-4" />
                                Créer un adhérent
                            </Button>
                        </Link>
                    </div>

                    {/* Table Card */}
                    {adherents.length > 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            {/* Table Header */}
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Liste des adhérents • {adherents.length} total
                                </h3>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-700">
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                                                ID
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Nom
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Prénom
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Cin
                                            </th>
                                            <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Téléphone
                                            </th>
                                            <th className="text-right py-4 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {adherents.map((adherent) => (
                                            <tr key={adherent.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg text-sm font-medium">
                                                        {adherent.id}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {adherent.nom}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                                        {adherent.prenom}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <a 
                                                        href={`mailto:${adherent.email}`}
                                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-150"
                                                    >
                                                        {adherent.email}
                                                    </a>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        {adherent.cin}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <a 
                                                        href={`tel:${adherent.telephone}`}
                                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-150 font-mono"
                                                    >
                                                        {adherent.telephone}
                                                    </a>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            onClick={() => handleEdit(adherent.id)}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
                                                            title="Modifier"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDelete(adherent.id , adherent.nom)}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                Aucun adhérent trouvé
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                                Commencez par créer votre premier adhérent pour voir apparaître la liste ici
                            </p>
                            <Link href="/adherents/create">
                                <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                    <PlusIcon className="h-5 w-5" />
                                    Créer le premier adhérent
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}