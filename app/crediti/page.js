import SimpleHeader from '@/components/SimpleHeader';
import { ExternalLink, Heart } from 'lucide-react';

export const metadata = {
    title: "Crediti - Buongiorno Calitri",
    description: "Riconoscimenti per le risorse utilizzate",
};

export default function CreditiPage() {
    const credits = [
        {
            title: "Webcam Live",
            description: "Le immagini in tempo reale sono gentilmente concesse da Calitri.org",
            link: "https://www.calitri.org",
            linkText: "Visita Calitri.org"
        },
        {
            title: "Meteo Dati",
            description: "Previsioni fornite da Open-Meteo API (Licenza CC-BY 4.0)",
            link: "https://open-meteo.com/",
            linkText: "Open-Meteo.com"
        },
        {
            title: "Santo del Giorno",
            description: "Informazioni sui santi fornite da Santodelgiorno.it",
            link: "https://www.santodelgiorno.it",
            linkText: "Santodelgiorno.it"
        },
        {
            title: "Icone",
            description: "Set di icone open source Lucide React",
            link: "https://lucide.dev",
            linkText: "Lucide.dev"
        },
        {
            title: "Infrastruttura",
            description: "Hosting by Vercel & Database by Supabase",
            link: "https://vercel.com",
            linkText: "Vercel"
        },
        {
            title: "Font",
            description: "Outfit Font by Google Fonts",
            link: "https://fonts.google.com/specimen/Outfit",
            linkText: "Google Fonts"
        }
    ];

    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Crediti" />

            <div className="p-6">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-500/10 text-red-500 mb-4 shadow-sm">
                        <Heart className="w-8 h-8 animate-pulse" fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-black text-stone-800 dark:text-white tracking-tight">Grazie!</h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-[250px] mx-auto leading-relaxed">
                        Questa app è possibile grazie all'uso di tecnologie open source e al supporto della community.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#222222] rounded-[32px] overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
                    {credits.map((item, index) => (
                        <div key={index} className="p-5 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-stone-100 dark:bg-stone-800 rounded-xl text-calitri-dark dark:text-stone-300 hover:bg-calitri-dark hover:text-white transition-all transform active:scale-95"
                                    title={item.linkText}
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
