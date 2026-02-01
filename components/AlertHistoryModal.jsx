"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle, History, CheckCircle } from "lucide-react";
import { getAlerts, getPastAlerts } from "@/lib/api";

export default function AlertHistoryModal({ isOpen, onClose }) {
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [historyAlerts, setHistoryAlerts] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                const active = await getAlerts();
                const past = await getPastAlerts();
                setActiveAlerts(active);
                setHistoryAlerts(past);
            };
            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const hasActiveAlerts = activeAlerts && activeAlerts.length > 0;
    const hasPastAlerts = historyAlerts && historyAlerts.length > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-200 border border-stone-100 dark:border-neutral-800 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Avvisi</h2>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Segnalazioni e comunicazioni</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Active Alerts Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            In corso
                        </h3>

                        {hasActiveAlerts ? (
                            <div className="space-y-3">
                                {activeAlerts.map((alert) => (
                                    <div key={alert.id} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-xl flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-red-900 dark:text-red-200 leading-tight">
                                                {alert.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-4 rounded-xl flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
                                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Nessuna allerta attiva al momento
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Past Alerts Section */}
                    {hasPastAlerts && (
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                <History className="w-4 h-4 text-neutral-400" />
                                Storico
                            </h3>
                            <div className="space-y-3">
                                {historyAlerts.map((alert) => (
                                    <div key={alert.id} className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl flex gap-3 opacity-75">
                                        <div className="min-w-[4px] bg-neutral-300 dark:bg-neutral-600 rounded-full" />
                                        <div>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{alert.date}</p>
                                            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-tight">
                                                {alert.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
