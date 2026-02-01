"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, LayoutGrid } from "lucide-react";
import clsx from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Eventi", href: "/eventi", icon: CalendarDays },
        { name: "Home", href: "/", icon: Home },
        { name: "Menu", href: "/impostazioni", icon: LayoutGrid },
    ];


    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-[#222222]/90 backdrop-blur-xl border border-stone-200/50 dark:border-stone-800/50 shadow-premium rounded-full px-2 py-2 flex items-center min-w-[280px]">
            <div className="flex justify-between items-center w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                "flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-300 active:scale-95",
                                isActive ? "bg-stone-100 dark:bg-stone-700 text-calitri-terra shadow-inner" : "text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={clsx(
                                "text-[10px] uppercase tracking-tighter mt-1",
                                isActive ? "font-black" : "font-medium"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
