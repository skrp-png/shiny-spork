import SimpleHeader from '@/components/SimpleHeader';
import MarketGrid from '@/components/MarketGrid';

export default function MercatinoPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Mercatino" />
            <div className="mt-2">
                <MarketGrid />
            </div>
        </main>
    );
}
