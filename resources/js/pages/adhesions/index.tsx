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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Adhésions" />

            <div className="min-h-screen bg-gray-50/30 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Adhésions</h1>
                            <p className="text-sm text-gray-500">Gérez les adhésions des membres</p>
                        </div>
                        <Link href="/adhesions/create">
                            <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                                <PlusIcon className="h-4 w-4" />
                                Nouvelle adhésion
                            </Button>
                        </Link>
                    </div>

                    {adhesions.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-sm font-medium text-gray-700">
                                    Liste des adhésions • {adhesions.length} total
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Début</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Fin</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Adhérent</th>
                                            <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {adhesions.map((adhesion) => (
                                            <tr key={adhesion.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">{adhesion.id}</td>
                                                <td className="py-4 px-6">{adhesion.type}</td>
                                                <td className="py-4 px-6">{adhesion.montant} MAD</td>
                                                <td className="py-4 px-6">{adhesion.date_debut}</td>
                                                <td className="py-4 px-6">{adhesion.date_fin}</td>
                                                <td className="py-4 px-6">{adhesion.adherent_nom}</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button onClick={() => handleEdit(adhesion.id)} className="w-8 h-8 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button onClick={() => handleDelete(adhesion.id, adhesion.type)} className="w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
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
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="mx-auto w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune adhésion trouvée</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Commencez par créer une première adhésion pour voir la liste ici
                            </p>
                            <Link href="/adhesions/create">
                                <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition">
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
