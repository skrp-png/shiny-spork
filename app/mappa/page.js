import SimpleHeader from '@/components/SimpleHeader';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = {
    title: "Mappa - Buongiorno Calitri",
    description: "Esplora i punti di interesse di Calitri",
};

export default function MappaPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Mappa Interattiva" />
            <div className="mt-2">
                <InteractiveMap />
            </div>
        </main>
    );
}
