"use client";

import { useState } from "react";
import { X, Upload, Camera, Image as ImageIcon } from "lucide-react";

export default function AddItemModal({ isOpen, onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "Cibo",
        image: "",
        seller_phone: "",
        seller_name: ""
    });
    const [imagePreview, setImagePreview] = useState(null);

    const categories = ["Cibo", "Mobili", "Elettronica", "Abbigliamento", "Altro"];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("La foto è troppo grande! Massimo 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setFormData({ ...formData, image: base64String });
            setImagePreview(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.seller_phone || !formData.seller_name) {
            alert("Compila tutti i campi obbligatori!");
            return;
        }

        if (!formData.image) {
            alert("Carica una foto dell'oggetto!");
            return;
        }

        const newItem = {
            id: Date.now(),
            ...formData
        };

        onAdd(newItem);
        setFormData({ title: "", price: "", category: "Cibo", image: "", seller_phone: "", seller_name: "" });
        setImagePreview(null);
        onClose();
    };

    const handleClose = () => {
        setFormData({ title: "", price: "", category: "Cibo", image: "", seller_phone: "", seller_name: "" });
        setImagePreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center pointer-events-none">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-5">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-calitri-dark mb-6">Nuovo Annuncio</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Il tuo nome *</label>
                        <input
                            type="text"
                            value={formData.seller_name}
                            onChange={(e) => setFormData({ ...formData, seller_name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-calitri-terra focus:outline-none"
                            placeholder="Es: Mario Rossi"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Titolo *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-calitri-terra focus:outline-none"
                            placeholder="Es: Olio d'oliva casereccio"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Tipo di Offerta *</label>
                        <select
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-calitri-terra focus:outline-none"
                        >
                            <option value="">Seleziona...</option>
                            <option value="GRATIS">Regalo (Gratis)</option>
                            <option value="BARATTO">Baratto (Scambio)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Categoria *</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-calitri-terra focus:outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Foto *</label>

                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setFormData({ ...formData, image: "" });
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:border-calitri-terra transition-colors bg-stone-50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-12 h-12 text-stone-400 mb-3" />
                                    <p className="text-sm text-stone-600 font-medium">Clicca per caricare una foto</p>
                                    <p className="text-xs text-stone-400 mt-1">PNG, JPG (max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Telefono WhatsApp *</label>
                        <input
                            type="tel"
                            value={formData.seller_phone}
                            onChange={(e) => setFormData({ ...formData, seller_phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-calitri-terra focus:outline-none"
                            placeholder="393331234567"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-calitri-terra text-white py-4 rounded-xl font-bold hover:bg-calitri-dark transition-colors"
                    >
                        Pubblica Annuncio
                    </button>
                </form>
            </div>
        </div>
    );
}
