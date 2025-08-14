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

interface CreateAdhesionProps {
    adherents: Adherent[];
    typeAdhesions: TypeAdhesion[];
}

const breadcrumbs: BreadcrumbItem[] = [
   {
        title: 'Adhésions',
        href: '/adhesions',
    },
    {
        title: 'Create Adhesion',
        href: '/create-adhesion',
    },
];

export default function CreateAdhesion({ adherents, typeAdhesions }: CreateAdhesionProps) {
    const { data, setData, post, processing, errors } = useForm({
        adherents_id: '',
        type_adhesion_id: '',
        date_debut: '',
        date_fin: '',
        // Remove statut since it's not in your database
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('adhesions.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Adhesion" />

            <div className="h-full p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500 dark:bg-teal-600">
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
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Adhesion</h1>
                            <p className="text-gray-600 dark:text-gray-300">Fill in the details below to create a new membership adhesion</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Adherent and Type Selection Row */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Select Adherent <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            onChange={(e) => setData('adherents_id', e.target.value)}
                                            className={`w-full appearance-none rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none ${
                                                errors.adherents_id ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            <option value="">-- Select an Adherent --</option>
                                            {(adherents || []).map((adherent) => (
                                                <option key={adherent.id} value={adherent.id}>
                                                    {adherent.prenom} - {adherent.nom} 
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.adherents_id && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.adherents_id}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Adhesion Type <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            onChange={(e) => setData('type_adhesion_id', e.target.value)}
                                            className={`w-full appearance-none rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none ${
                                                errors.type_adhesion_id ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        >
                                            <option value="">-- Select Adhesion Type --</option>
                                            {(typeAdhesions || []).map((type) => (
                                                <option key={type.id} value={type.id}>
                                                    {type.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.type_adhesion_id && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.type_adhesion_id}</p>}
                                </div>
                            </div>

                            {/* Date Fields Row */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Start Date <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            className={`w-full rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none ${
                                                errors.date_debut ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                    </div>
                                    {errors.date_debut && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.date_debut}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        End Date <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                            className={`w-full rounded-md border bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-3 pr-3 pl-10 text-sm focus:border-teal-500 dark:focus:border-teal-400 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:outline-none ${
                                                errors.date_fin ? 'border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                        />
                                    </div>
                                    {errors.date_fin && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.date_fin}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="mr-2 -ml-1 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Adhesion
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}