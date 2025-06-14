import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Adherent {
    id: number;
    nom: string;
    prenom: string;
    email: string;
}

interface TypeAdhesion {
    id: number;
    nom: string;
    description?: string;
}

interface Adhesion {
    id: number;
    adherents_id: number;
    type_adhesion_id: number;
    date_debut: string;
    date_fin: string;
    statut: string;
}

interface EditAdhesionProps {
    adhesion: Adhesion;
    adherents: Adherent[];
    typeAdhesions: TypeAdhesion[];
}

const breadcrumbs: BreadcrumbItem[] = [
   {
        title: 'Adhésions',
        href: '/adhesions',
    },
    {
        title: 'Edit Adhesion',
        href: '', // current page url or empty
    },
];

export default function EditAdhesion({ adhesion, adherents, typeAdhesions }: EditAdhesionProps) {
const { data, setData, put, processing, errors } = useForm({
    adherents_id: adhesion.adherents_id,
    type_adhesion_id: adhesion.type_adhesion_id,
    date_debut: adhesion.date_debut,
    date_fin: adhesion.date_fin,
    statut: adhesion.statut,
});


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('adhesions.update', adhesion.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Adhesion" />

            <div className="h-full p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Edit Adhesion</h1>
                            <p className="text-gray-600">Update the details of this membership adhesion</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Adherent and Type Selection Row */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Select Adherent <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        <select
                                            name="adherents_id"
                                            value={data.adherents_id}
                                            onChange={(e) => setData('adherents_id',Number(e.target.value))}
                                            className={`w-full appearance-none rounded-md border bg-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                                errors.adherents_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            {(adherents || []).map((adherent) => (
                                                <option key={adherent.id} value={adherent.id}>
                                                    {adherent.prenom} - {adherent.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.adherents_id && <p className="mt-1 text-sm text-red-500">{errors.adherents_id}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Adhesion Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                />
                                            </svg>
                                        </div>
                                        <select
                                            name="type_adhesion_id"
                                            value={data.type_adhesion_id}
                                            onChange={(e) => setData('type_adhesion_id', Number(e.target.value))}
                                            className={`w-full appearance-none rounded-md border bg-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                                errors.type_adhesion_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            {(typeAdhesions || []).map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.type_adhesion_id && <p className="mt-1 text-sm text-red-500">{errors.type_adhesion_id}</p>}
                                </div>
                            </div>

                            {/* Date Fields Row */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Start Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="date"
                                            name="date_debut"
                                            value={data.date_debut}
                                            onChange={(e) => setData('date_debut', e.target.value)}
                                            className={`w-full rounded-md border bg-white py-3 pl-10 pr-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                                errors.date_debut ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    {errors.date_debut && <p className="mt-1 text-sm text-red-500">{errors.date_debut}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        End Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="date"
                                            name="date_fin"
                                            value={data.date_fin}
                                            onChange={(e) => setData('date_fin', e.target.value)}
                                            className={`w-full rounded-md border bg-white py-3 pl-10 pr-3 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                                                errors.date_fin ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                    </div>
                                    {errors.date_fin && <p className="mt-1 text-sm text-red-500">{errors.date_fin}</p>}
                                </div>
                            </div>

                           
                            {/* Submit Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md bg-teal-600 px-6 py-3 text-white hover:bg-teal-700 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
