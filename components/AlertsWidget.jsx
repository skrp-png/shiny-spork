"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { getAlerts } from "@/lib/api";
import AlertHistoryModal from "./AlertHistoryModal";

export default function AlertsWidget() {
    const [alerts, setAlerts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAlerts = async () => {
            const data = await getAlerts();
            setAlerts(data);
        };
        fetchAlerts();
    }, []);

    const hasAlerts = alerts && alerts.length > 0;

    return (
        <section>
            <div onClick={() => setIsModalOpen(true)} className="cursor-pointer transition-transform active:scale-95">
                {hasAlerts ? (
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="bg-red-500 dark:bg-red-800 text-white rounded-2xl p-4 shadow-lg shadow-red-500/10 dark:shadow-red-900/10 flex gap-3 animate-in slide-in-from-bottom-2">
                                <div className="bg-white/20 p-2 rounded-full h-fit flex-shrink-0 backdrop-blur-sm">
                                    <AlertTriangle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold mb-0.5 leading-none">Attenzione</h3>
                                    <p className="text-[11px] font-medium leading-tight opacity-95">{alert.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-stone-100 dark:bg-neutral-800 rounded-xl p-3 flex items-center justify-between group hover:bg-stone-200 dark:hover:bg-neutral-700 transition-colors">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-green-500/10 dark:bg-green-500/20 p-1.5 rounded-full">
                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                            </div>
                            <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
                                Nessuna allerta attiva
                            </span>
                        </div>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider group-hover:text-stone-500 transition-colors">
                            Vedi storico
                        </span>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <AlertHistoryModal
                    isOpen={isModalOpen}
                    onClose={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(false);
                    }}
                />
            )}
        </section>
    );
}
