import SimpleHeader from '@/components/SimpleHeader';

export const metadata = {
    title: "Cookie Policy - Buongiorno Calitri",
    description: "Informativa sull'uso dei cookie",
};

export default function CookiePage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Cookie Policy" />

            <div className="p-6 space-y-6 text-stone-700 dark:text-stone-300">
                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">1. Cosa sono i Cookie</h2>
                    <p className="text-sm leading-relaxed">
                        I cookie sono piccoli file di testo che i siti visitati dall'utente inviano al suo terminale, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita del medesimo utente.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">2. Tipologie di Cookie utilizzati</h2>

                    <div className="space-y-2">
                        <h3 className="font-bold text-calitri-green">Cookie Tecnici e di Sessione</h3>
                        <p className="text-sm leading-relaxed">
                            Sono necessari per il corretto funzionamento dell'app. Ad esempio, vengono utilizzati per ricordare le tue preferenze sul tema (Chiaro/Scuro) o per gestire lo stato delle notifiche. Senza questi cookie, l'app non potrebbe funzionare correttamente.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-calitri-green">Cookie Analitici (Google Analytics)</h3>
                        <p className="text-sm leading-relaxed">
                            Utilizziamo <strong>Google Analytics 4</strong> per raccogliere informazioni in forma aggregata e anonima sul numero degli utenti e su come questi visitano l'app. Questo ci aiuta a migliorare costantemente il servizio. L'indirizzo IP è anonimizzato.
                        </p>
                    </div>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">3. Gestione dei Cookie</h2>
                    <p className="text-sm leading-relaxed">
                        Puoi gestire le tue preferenze sui cookie direttamente attraverso le impostazioni del tuo browser. Inoltre, all'interno dell'app puoi scegliere di cancellare i dati locali (cache e preferenze) attraverso la sezione <strong>Impostazioni &gt; Dati e Privacy</strong>.
                    </p>
                    <p className="text-sm leading-relaxed">
                        Tuttavia, disabilitando i cookie tecnici alcune funzionalità dell'app potrebbero non essere disponibili.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">4. Terze Parti</h2>
                    <p className="text-sm leading-relaxed">
                        L'app interagisce con servizi forniti da terze parti che potrebbero installare cookie:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                        <li><strong>Google Analytics:</strong> Per statistiche di utilizzo.</li>
                        <li><strong>Supabase:</strong> Fornisce l'infrastruttura backend e potrebbe utilizzare cookie tecnici per la gestione delle sessioni.</li>
                    </ul>
                </section>

                <div className="pt-8 text-xs text-stone-400 text-center">
                    Ultimo aggiornamento: Febbraio 2026
                </div>
            </div>
        </main>
    );
}
