import SimpleHeader from '@/components/SimpleHeader';

export const metadata = {
    title: "Privacy Policy - Buongiorno Calitri",
    description: "Informativa sulla privacy",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Privacy Policy" />

            <div className="p-6 space-y-6 text-stone-700 dark:text-stone-300">
                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">1. Introduzione</h2>
                    <p className="text-sm leading-relaxed">
                        La presente Privacy Policy descrive come <strong>Buongiorno Calitri</strong> raccoglie, utilizza e protegge le informazioni degli utenti. L'app è progettata per offrire servizi utili alla comunità di Calitri nel rispetto della privacy.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">2. Dati Raccimolati</h2>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                        <li><strong>Dati di Navigazione:</strong> Utilizziamo Google Analytics 4 in forma anonimizzata per contare le visite e migliorare l'esperienza.</li>
                        <li><strong>Preferenze Locali:</strong> Le impostazioni (tema, filtri notifiche) sono salvate esclusivamente sul tuo dispositivo.</li>
                        <li><strong>Notifiche Push:</strong> Se attivate, salviamo un identificativo anonimo (token) per inviarti gli avvisi richiesti. Questo token non è collegato alla tua identità.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">3. Finalità del Trattamento</h2>
                    <p className="text-sm leading-relaxed">
                        I dati vengono utilizzati esclusivamente per:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                        <li>Fornire i servizi richiesti (es. Notifiche Meteo).</li>
                        <li>Analizzare statistiche aggregate di utilizzo per migliorare l'app.</li>
                        <li>Garantire la sicurezza e il corretto funzionamento tecnico.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">4. Terze Parti</h2>
                    <p className="text-sm leading-relaxed">
                        L'app si appoggia a servizi sicuri di terze parti:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                        <li><strong>Supabase:</strong> Per il database e l'autenticazione.</li>
                        <li><strong>Vercel:</strong> Per l'hosting dell'applicazione.</li>
                        <li><strong>Google Analytics:</strong> Per le statistiche.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">5. Contatti</h2>
                    <p className="text-sm leading-relaxed">
                        Per qualsiasi domanda riguardante la privacy, puoi contattarci tramite la sezione Feedback dell'app o direttamente via email.
                    </p>
                </section>

                <div className="pt-8 text-xs text-stone-400 text-center">
                    Ultimo aggiornamento: Gennaio 2026
                </div>
            </div>
        </main>
    );
}
