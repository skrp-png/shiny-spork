import Header from '@/components/Header';
import AlertsWidget from '@/components/AlertsWidget';
import WeatherCard from '@/components/WeatherCard';
import TodayEvents from '@/components/TodayEvents';
import NewsPreview from '@/components/NewsPreview';
import { getAlerts, getEvents, getNews } from '@/lib/api';
import { getCurrentWeather } from '@/lib/weather';

export default async function Home() {
  const [alerts, weather, events, news] = await Promise.all([
    getAlerts(),
    getCurrentWeather(),
    getEvents(),
    getNews(),
  ]);

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-[#1a1a1a] pb-24 md:max-w-md md:mx-auto md:shadow-2xl md:border-x md:border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <Header />

      <div className="px-5 mt-2 grid grid-cols-2 gap-2">
        {/* Full width Alerts (if any) */}
        <div className="col-span-2">
          <AlertsWidget initialAlerts={alerts} />
        </div>

        {/* Full width Weather Card */}
        <div className="col-span-2">
          <WeatherCard initialWeather={weather} />
        </div>

        {/* Bento Widgets */}
        <div className="col-span-1">
          <TodayEvents initialEvents={events} />
        </div>
        <div className="col-span-1">
          <NewsPreview initialNews={news} />
        </div>
      </div>
    </main>
  );
}
