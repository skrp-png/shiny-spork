import SimpleHeader from '@/components/SimpleHeader';
import WhereToStay from '@/components/WhereToStay';

export const metadata = {
    title: "Dove Mangiare & Dormire - Buongiorno Calitri",
    description: "Scopri i migliori ristoranti, pizzerie, hotel e B&B di Calitri",
};

export default function WhereToStayPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="Mangiare & Dormire" />
            <div className="mt-2">
                <WhereToStay />
            </div>
        </main>
    );
}
