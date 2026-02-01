import SimpleHeader from '@/components/SimpleHeader';

export const metadata = {
    title: "Termini e Condizioni - Buongiorno Calitri",
    description: "Termini di servizio dell'applicazione",
};

export default function TerminiPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:md:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Termini e Condizioni" />

            <div className="p-6 space-y-6 text-stone-700 dark:text-stone-300">
                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">1. Accettazione</h2>
                    <p className="text-sm leading-relaxed">
                        Utilizzando l'app <strong>Buongiorno Calitri</strong>, accetti i presenti Termini e Condizioni. L'app è fornita "così com'è" per uso informativo e ricreativo.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">2. Uso Responsabile</h2>
                    <p className="text-sm leading-relaxed">
                        L'utente si impegna a utilizzare l'app in modo lecito e rispettoso. È vietato:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                        <li>Tentare di manomettere o violare la sicurezza dell'app.</li>
                        <li>Utilizzare i contenuti per scopi commerciali non autorizzati.</li>
                        <li>Inviare feedback offensivi o inappropriati.</li>
                    </ul>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">3. Contenuti</h2>
                    <p className="text-sm leading-relaxed">
                        Le informazioni presenti (meteo, eventi, orari, mercatino) sono fornite a scopo indicativo. Non garantiamo l'assoluta accuratezza o tempestività dei dati, sebbene ci impegniamo per mantenerli aggiornati.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">4. Limitazione di Responsabilità</h2>
                    <p className="text-sm leading-relaxed">
                        Lo sviluppatore non è responsabile per eventuali danni diretti o indiretti derivanti dall'uso o dall'impossibilità di utilizzare l'applicazione.
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-bold text-calitri-dark dark:text-white">5. Modifiche</h2>
                    <p className="text-sm leading-relaxed">
                        Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. L'uso continuato dell'app costituisce accettazione delle modifiche.
                    </p>
                </section>

                <div className="pt-8 text-xs text-stone-400 text-center">
                    Ultimo aggiornamento: Gennaio 2026
                </div>
            </div>
        </main>
    );
}
