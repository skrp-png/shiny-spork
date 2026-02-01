import SimpleHeader from '@/components/SimpleHeader';
import NewsList from '@/components/NewsList';

export const metadata = {
    title: "News - Buongiorno Calitri",
    description: "Notizie, storie e tradizioni di Calitri",
};

export default function NewsPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <SimpleHeader title="News & Storie" />
            <div className="mt-2">
                <NewsList />
            </div>
        </main>
    );
}
