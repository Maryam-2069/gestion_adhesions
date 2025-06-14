import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Types d’adhésion',
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Types d’adhésion" />

            <div className="min-h-screen bg-gray-50/30 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-1">Types d’adhésion</h1>
                            <p className="text-sm text-gray-500">Gérez les types disponibles</p>
                        </div>
                        <Link href="/types-adhesion/create">
                            <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition">
                                <PlusIcon className="h-4 w-4" />
                                Nouveau type
                            </Button>
                        </Link>
                    </div>

                    {type_adhesions.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-sm font-medium text-gray-700">
                                    Liste des types • {type_adhesions.length} total
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Durée</th>
                                            <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                                            <th className="py-4 px-6 text-right text-xs font-medium text-gray-500 uppercase w-24">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {type_adhesions.map((type) => (
                                            <tr key={type.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6">{type.id}</td>
                                                <td className="py-4 px-6">{type.nom}</td>
                                                <td className="py-4 px-6">{type.duree } Mois</td>
                                                <td className="py-4 px-6">{type.prix} MAD</td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button onClick={() => handleEdit(type.id)} className="w-8 h-8 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button onClick={() => handleDelete(type.id, type.nom)} className="w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m2 0a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2m10 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun type trouvé</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Commencez par ajouter un type d’adhésion pour lister ici
                            </p>
                            <Link href="/type-adhesions/create">
                                <Button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition">
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
