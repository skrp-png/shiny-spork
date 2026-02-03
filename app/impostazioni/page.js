import SimpleHeader from '@/components/SimpleHeader';
import Link from 'next/link';
import { Newspaper, Map, Briefcase, Settings, ChevronRight, UtensilsCrossed, ShoppingBag } from 'lucide-react';

export const metadata = {
    title: "Menu - Buongiorno Calitri",
    description: "Esplora tutte le funzionalità dell'app",
};

export default function AltroPage() {
    const sections = [
        {
            title: "Mercatino",
            description: "Compra e vendi nella community",
            icon: ShoppingBag,
            href: "/mercatino",
            color: "from-orange-500 to-red-600",
            iconBg: "bg-orange-500/10 text-orange-600",
            comingSoon: true
        },
        {
            title: "Dove Mangiare & Dormire",
            description: "Ristoranti, pizzerie, hotel e B&B",
            icon: UtensilsCrossed,
            href: "/dove",
            color: "from-amber-500 to-orange-600",
            iconBg: "bg-amber-500/10 text-amber-600"
        },
        {
            title: "Mappa Interattiva",
            description: "Esplora i punti di interesse del paese",
            icon: Map,
            href: "/mappa",
            color: "from-calitri-green to-emerald-600",
            iconBg: "bg-calitri-green/10 text-calitri-green"
        },
        {
            title: "Servizi Utili",
            description: "Orari, contatti e raccolta differenziata",
            icon: Briefcase,
            href: "/servizi",
            color: "from-calitri-dark to-slate-800",
            iconBg: "bg-calitri-dark/10 text-calitri-dark"
        },
        {
            title: "Impostazioni",
            description: "Personalizza la tua esperienza",
            icon: Settings,
            href: "/preferenze",
            color: "from-stone-600 to-stone-800",
            iconBg: "bg-stone-600/10 text-stone-600",
            comingSoon: false
        }
    ];


    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Menu" />

            <div className="p-5 space-y-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-calitri-dark mb-2">Esplora</h2>
                    <p className="text-stone-600 dark:text-stone-400 text-sm">Scopri tutte le funzionalità di Buongiorno Calitri</p>
                </div>

                {sections.map((section, index) => {
                    const Icon = section.icon;
                    const content = (
                        <div
                            className={`
                                bg-white dark:bg-[#222222] rounded-2xl p-5 shadow-sm border border-stone-100 dark:border-stone-800
                                hover:shadow-premium transition-all duration-300
                                ${!section.comingSoon ? 'cursor-pointer active:scale-[0.98]' : 'opacity-75'}
                                animate-slideUp
                            `}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl ${section.iconBg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-1 flex items-center gap-2">
                                        {section.title}
                                        {section.comingSoon && (
                                            <span className="text-[10px] px-2 py-0.5 bg-calitri-ocra text-calitri-dark rounded-full font-bold">
                                                PRESTO
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-sm text-stone-600 dark:text-stone-400">
                                        {section.description}
                                    </p>
                                </div>

                                {!section.comingSoon && (
                                    <ChevronRight className="w-5 h-5 text-stone-400 flex-shrink-0" />
                                )}
                            </div>
                        </div>
                    );

                    return section.comingSoon ? (
                        <div key={section.title}>{content}</div>
                    ) : (
                        <Link key={section.title} href={section.href}>
                            {content}
                        </Link>
                    );
                })}

                {/* Info App */}
                <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
                    <div className="text-center space-y-2">
                        <h3 className="font-bold text-calitri-dark">Buongiorno Calitri</h3>
                        <p className="text-xs text-stone-500 dark:text-stone-500">
                            La community app per Calitri
                        </p>
                        <p className="text-xs text-stone-400">
                            Versione 0.1.0
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
