import Header from '@/components/Header';
import AlertsWidget from '@/components/AlertsWidget';
import WeatherCard from '@/components/WeatherCard';
import TodayEvents from '@/components/TodayEvents';
import NewsPreview from '@/components/NewsPreview';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <Header />

      <div className="px-5 mt-2 grid grid-cols-2 gap-2">
        {/* Full width Alerts (if any) */}
        <div className="col-span-2">
          <AlertsWidget />
        </div>

        {/* Full width Weather Card */}
        <div className="col-span-2">
          <WeatherCard />
        </div>

        {/* Bento Widgets */}
        <div className="col-span-1">
          <TodayEvents />
        </div>
        <div className="col-span-1">
          <NewsPreview />
        </div>
      </div>
    </main>
  );
}
