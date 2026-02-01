import SimpleHeader from '@/components/SimpleHeader';
import ServicesWidget from '@/components/ServicesWidget';

export const metadata = {
    title: "Servizi - Buongiorno Calitri",
    description: "Servizi utili, orari e contatti",
};

export default function ServiziPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Servizi Utili" />
            <div className="mt-2">
                <ServicesWidget />
            </div>
        </main>
    );
}
