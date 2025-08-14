import React, { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [isVisible, setIsVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { label: "Activités Gérées", value: "25+" },
        { label: "Adhérents Actifs", value: "800+" },
        { label: "Taux de Satisfaction", value: "96%" },
        { label: "Formations Dispensées", value: "150+" }
    ];

    const features = [
        {
            icon: "🎓",
            title: "Gestion des Formations",
            description: "Organisez et suivez toutes vos formations professionnelles avec un système de gestion complet et intuitif."
        },
        {
            icon: "👥",
            title: "Suivi des Adhésions",
            description: "Gérez facilement les inscriptions, renouvellements et statuts de tous vos adhérents en temps réel."
        },
        {
            icon: "📊",
            title: "Analytiques Avancées",
            description: "Obtenez des insights précieux sur vos activités avec des rapports détaillés et des tableaux de bord personnalisés."
        },
        {
            icon: "🏢",
            title: "Multi-Activités",
            description: "Centralisez la gestion de toutes vos activités et services au sein de la Cité des Métiers et des Compétences."
        }
    ];

    const activities = [
        { name: "Formation Professionnelle", color: "from-blue-400 to-cyan-500" },
        { name: "Orientation Métiers", color: "from-cyan-400 to-teal-500" },
        { name: "Développement Compétences", color: "from-teal-400 to-green-500" },
        { name: "Accompagnement Carrière", color: "from-green-400 to-blue-500" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            
            {/* Header */}
            <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <nav className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            {/* CMC Logo inspired design */}
                            <div className="relative">
                                <div className="flex flex-col space-y-1">
                                    <div className="flex space-x-1">
                                        <div className="w-8 h-2 bg-gray-400 rounded-sm"></div>
                                        <div className="w-6 h-2 bg-gray-400 rounded-sm"></div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-6 h-3 bg-cyan-500 rounded-sm"></div>
                                        <div className="w-8 h-3 bg-cyan-400 rounded-sm"></div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <div className="w-4 h-2 bg-cyan-600 rounded-sm"></div>
                                        <div className="w-10 h-2 bg-cyan-500 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">CMC Platform</h1>
                                <p className="text-xs text-gray-600">Gestion des Activités</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-4">
                                {auth?.user ? (
                                    <a href="/dashboard" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg transition-all">
                                        Tableau de Bord
                                    </a>
                                ) : (
                                    <React.Fragment>
                                        <a href="/login" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Connexion
                                        </a>
                                        <a href="/register" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg transition-all">
                                            S'inscrire
                                        </a>
                                    </React.Fragment>
                                )}
                            </div>
                            
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
                
                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="px-6 py-4 space-y-3">
                            {auth?.user ? (
                                <a href="/dashboard" className="block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg transition-all">
                                    Tableau de Bord
                                </a>
                            ) : (
                                <React.Fragment>
                                    <a href="/login" className="block rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        Connexion
                                    </a>
                                    <a href="/register" className="block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg transition-all">
                                        S'inscrire
                                    </a>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <main className="relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16">
                    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        
                        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
                            <div className="lg:col-span-7">
                                <div className="text-center lg:text-left">
                                    <div className="mb-6">
                                        <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-medium text-cyan-800">
                                            🎯 Nouvelle Génération de Formation
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                                        <span className="block">Gestion Moderne</span>
                                        <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                                            des Adhésions
                                        </span>
                                        <span className="block">et Activités CMC</span>
                                    </h1>
                                    
                                    <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                                        Révolutionnez la gestion de vos formations et adhésions à la Cité des Métiers et des Compétences. 
                                        Une plateforme complète pour accompagner la formation nouvelle génération.
                                    </p>
                                    
                                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        {auth?.user ? (
                                            <a href="/dashboard" className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white hover:from-cyan-600 hover:to-blue-700 shadow-xl transform hover:scale-105 transition-all text-center">
                                                Accéder au Tableau de Bord
                                            </a>
                                        ) : (
                                            <React.Fragment>
                                                <a href="/register" className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white hover:from-cyan-600 hover:to-blue-700 shadow-xl transform hover:scale-105 transition-all text-center">
                                                    Commencer Maintenant
                                                </a>
                                                <a href="/login" className="inline-block rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all text-center">
                                                    Se Connecter
                                                </a>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12 lg:col-span-5 lg:mt-0">
                                <div className="relative">
                                    <div className="rounded-2xl bg-white p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900">Tableau de Bord CMC</h3>
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                                                ● En Direct
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            {stats.map((stat, index) => (
                                                <div key={index} className="rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
                                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {activities.map((activity, index) => (
                                                <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${activity.color}`}></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                                                        </div>
                                                    </div>
                                                    <span className="rounded-full bg-cyan-100 px-2 py-1 text-xs text-cyan-800">
                                                        Actif
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="absolute -top-4 -right-4 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 p-4 shadow-lg transform rotate-12 hover:rotate-6 transition-transform">
                                        <p className="text-white text-sm font-bold">📈 +25% Adhésions</p>
                                    </div>
                                    
                                    <div className="absolute -bottom-4 -left-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 p-4 shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform">
                                        <p className="text-white text-sm font-bold">⚡ Temps Réel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Features Section */}
                    <div className="mt-24">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Outils professionnels pour la formation moderne
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Technologie de pointe conçue pour accompagner votre croissance
                            </p>
                        </div>
                        
                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className={`transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                        <div className="mb-4 text-4xl">{feature.icon}</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* CTA Section */}
                    <div className="mt-24 mb-16">
                        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-16 text-center shadow-2xl">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                Prêt à moderniser votre gestion ?
                            </h2>
                            <p className="mt-4 text-xl text-cyan-100">
                                Rejoignez les professionnels qui révolutionnent la formation
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/dashboard" className="inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-cyan-600 hover:bg-gray-50 shadow-lg transform hover:scale-105 transition-all">
                                    Découvrir la Plateforme
                                </a>
                                <button className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-cyan-600 transition-all">
                                    Demander une Démo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <footer className="bg-gray-900 border-t border-gray-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="md:col-span-1">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="relative">
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex space-x-1">
                                                <div className="w-6 h-1.5 bg-gray-400 rounded-sm"></div>
                                                <div className="w-4 h-1.5 bg-gray-400 rounded-sm"></div>
                                            </div>
                                            <div className="flex space-x-1">
                                                <div className="w-4 h-2 bg-cyan-500 rounded-sm"></div>
                                                <div className="w-6 h-2 bg-cyan-400 rounded-sm"></div>
                                            </div>
                                            <div className="flex space-x-1">
                                                <div className="w-3 h-1.5 bg-cyan-600 rounded-sm"></div>
                                                <div className="w-7 h-1.5 bg-cyan-500 rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-white">CMC Platform</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Cité des Métiers et des Compétences - La formation nouvelle génération.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-white mb-4">Plateforme</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="/dashboard" className="text-gray-400 hover:text-cyan-400 transition-colors">Tableau de Bord</a></li>
                                    <li><a href="/adherents" className="text-gray-400 hover:text-cyan-400 transition-colors">Gestion Adhérents</a></li>
                                    <li><a href="/formations" className="text-gray-400 hover:text-cyan-400 transition-colors">Formations</a></li>
                                    <li><a href="/rapports" className="text-gray-400 hover:text-cyan-400 transition-colors">Rapports</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-white mb-4">Ressources</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Guide d'utilisation</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Bonnes Pratiques</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Études de Cas</a></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-white mb-4">Support</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Centre d'Aide</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Chat en Direct</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">État du Système</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
                            <p className="text-gray-400 text-sm">
                                © 2025 Cité des Métiers et des Compétences. La formation nouvelle génération.
                            </p>
                            <div className="mt-4 md:mt-0 flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    Politique de Confidentialité
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    Conditions d'Utilisation
                                </a>
                                <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                    Sécurité
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}