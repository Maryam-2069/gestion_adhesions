import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Modifier Type d\'Adhésion',
        href: '/types-adhesion/{id}/edit',
    },
];

interface TypeAdhesion {
    id: number;
    nom: string;
    duree: string;
    prix: string;
}

interface Props {
    typeAdhesion: TypeAdhesion;
}

export default function EditTypeAdhesion({ typeAdhesion }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom: typeAdhesion.nom,
        duree: typeAdhesion.duree,
        prix: typeAdhesion.prix,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('types-adhesion.update', typeAdhesion.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier Type d'Adhésion" />

            <div className="p-6 h-full">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Modifier Type d'Adhésion</h1>
                            <p className="text-gray-600">Modifiez les détails du type d'adhésion existant</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Nom Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom du type <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                            errors.nom ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Ex: Adhésion Premium, Adhésion Standard..."
                                    />
                                </div>
                                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
                            </div>

                            {/* Durée and Prix Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Durée (mois) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            name="duree"
                                            value={data.duree}
                                            onChange={(e) => setData('duree', e.target.value)}
                                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                                errors.duree ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="12"
                                            min="1"
                                        />
                                    </div>
                                    {errors.duree && <p className="text-red-500 text-sm mt-1">{errors.duree}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prix (MAD) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="prix"
                                            value={data.prix}
                                            onChange={(e) => setData('prix', e.target.value)}
                                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                                errors.prix ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                            }`}
                                            placeholder="299.00"
                                            min="0"
                                        />
                                    </div>
                                    {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Modification...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Modifier le Type
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