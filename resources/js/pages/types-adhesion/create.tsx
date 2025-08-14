import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Types d\'adhésion',
        href: route('types-adhesion.index'),
    },
    {
        title: 'Créer un type',
        href: route('types-adhesion.create'),
    },
];

export default function CreateTypeAdhesion() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        duree: '',
        prix: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('types-adhesion.store'));
    };

    // Format duration for preview
    const formatDuration = (months: number) => {
        if (!months || months === 0) return '';
        if (months === 1) return '1 mois';
        if (months < 12) return `${months} mois`;
        if (months === 12) return '1 an';
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`;
        return `${years} an${years > 1 ? 's' : ''} ${remainingMonths} mois`;
    };

    // Format currency for preview
    const formatCurrency = (amount: number) => {
        if (!amount || amount === 0) return '';
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un Type d'Adhésion" />

            <div className="p-6 h-full">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-500 dark:bg-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Créer un Type d'Adhésion</h1>
                            <p className="text-gray-600 dark:text-gray-300">Définissez les détails du nouveau type d'adhésion</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Nom Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nom du type <span className="text-red-500 dark:text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 ${
                                            errors.nom ? 'border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400' : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="Ex: Adhésion Premium, Adhésion Standard..."
                                    />
                                </div>
                                {errors.nom && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nom}</p>}
                            </div>

                            {/* Durée and Prix Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Durée (mois) <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            name="duree"
                                            value={data.duree}
                                            onChange={(e) => setData('duree', e.target.value)}
                                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 ${
                                                errors.duree ? 'border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            placeholder="12"
                                            min="1"
                                        />
                                    </div>
                                    {data.duree && Number(data.duree) > 0 && (
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                            Aperçu: {formatDuration(Number(data.duree))}
                                        </p>
                                    )}
                                    {errors.duree && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.duree}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Prix (MAD) <span className="text-red-500 dark:text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="prix"
                                            value={data.prix}
                                            onChange={(e) => setData('prix', e.target.value)}
                                            className={`w-full pl-10 pr-3 py-3 border rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-teal-500 dark:focus:border-teal-400 ${
                                                errors.prix ? 'border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400' : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                            placeholder="299.00"
                                            min="0"
                                        />
                                    </div>
                                    {data.prix && Number(data.prix) > 0 && (
                                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                            Aperçu: {formatCurrency(Number(data.prix))}
                                        </p>
                                    )}
                                    {errors.prix && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.prix}</p>}
                                </div>
                            </div>

                            {/* Preview Card */}
                            {(data.nom || data.duree || data.prix) && (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Aperçu du type d'adhésion
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 w-16">Nom:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{data.nom || 'Non défini'}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 w-16">Durée:</span>
                                            <span className="font-medium text-blue-600 dark:text-blue-400">
                                                {data.duree && Number(data.duree) > 0 ? formatDuration(Number(data.duree)) : 'Non définie'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-400 w-16">Prix:</span>
                                            <span className="font-medium text-green-600 dark:text-green-400">
                                                {data.prix && Number(data.prix) > 0 ? formatCurrency(Number(data.prix)) : 'Non défini'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-teal-400 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Créer le Type
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