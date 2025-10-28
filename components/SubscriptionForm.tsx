'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Cycle } from '@/lib/types';

export function SubscriptionForm({ onDone }: { onDone?: () => void }) {
  const { editing, addSub, updateSub, setEditing, settings } = useStore();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cycle, setCycle] = useState<Cycle>('monthly');
  const [nextBilling, setNextBilling] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [notes, setNotes] = useState('');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setPrice(editing.price.toString());
      setCycle(editing.cycle);
      // Convert ISO to local date for input
      const date = new Date(editing.nextBilling);
      const localDate = date.toISOString().split('T')?.[0] || '';
      setNextBilling(localDate);
      setCategory(editing.category || '');
      setColor(editing.color || '#3B82F6');
      setNotes(editing.notes || '');
      setPaused(editing.paused || false);
    } else {
      reset();
    }
  }, [editing]);

  function reset() {
    setName('');
    setPrice('');
    setCycle('monthly');
    setNextBilling('');
    setCategory('');
    setColor('#3B82F6');
    setNotes('');
    setPaused(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert('Le nom est requis');
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      alert('Le prix doit être un nombre valide et positif');
      return;
    }

    if (!nextBilling) {
      alert('La date de prochaine facturation est requise');
      return;
    }

    const subData = {
      name: name.trim(),
      price: numPrice,
      currency: settings.currency,
      cycle,
      nextBilling: new Date(nextBilling).toISOString(),
      category: category.trim() || undefined,
      color: color.trim() || undefined,
      notes: notes.trim() || undefined,
      paused,
    };

    if (editing) {
      updateSub(editing.id, subData);
      setEditing(null);
    } else {
      addSub(subData);
    }

    reset();
    onDone?.();
  }

  function handleCancel() {
    reset();
    setEditing(null);
    onDone?.();
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold mb-4">
        {editing ? 'Modifier l\'abonnement' : 'Nouvel abonnement'}
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
            placeholder="ex: Netflix, Spotify..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="label">
              Prix ({settings.currency}) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              required
              placeholder="0.00"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="cycle" className="label">
              Période <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="cycle"
                  value="monthly"
                  checked={cycle === 'monthly'}
                  onChange={(e) => setCycle(e.target.value as Cycle)}
                  className="w-4 h-4"
                  required
                />
                <span>Mensuel</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="cycle"
                  value="yearly"
                  checked={cycle === 'yearly'}
                  onChange={(e) => setCycle(e.target.value as Cycle)}
                  className="w-4 h-4"
                  required
                />
                <span>Annuel</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="nextBillingDate" className="label">
            Prochaine facturation <span className="text-red-500">*</span>
          </label>
          <input
            id="nextBillingDate"
            type="date"
            value={nextBilling}
            onChange={(e) => setNextBilling(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="label">
            Catégorie
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            placeholder="ex: Divertissement, Cloud..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="color" className="label">
              Couleur
            </label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded border border-gray-300"
            />
          </div>

          <div>
            <label className="label flex items-center space-x-2">
              <input
                type="checkbox"
                checked={paused}
                onChange={(e) => setPaused(e.target.checked)}
                className="w-4 h-4"
              />
              <span>En pause</span>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="label">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input"
            rows={2}
            placeholder="Note supplémentaire..."
          />
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button type="submit" className="btn btn-primary">
          {editing ? 'Modifier' : 'Ajouter'}
        </button>
        {(editing || (name || price || nextBilling)) && (
          <button type="button" onClick={handleCancel} className="btn btn-ghost">
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
