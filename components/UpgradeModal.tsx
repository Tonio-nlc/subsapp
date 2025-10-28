'use client';

import { useStore } from '@/lib/store';
import clsx from 'clsx';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason?: 'limit' | 'export';
}

export function UpgradeModal({ open, onClose, reason = 'limit' }: UpgradeModalProps) {
  const { setSettings } = useStore();

  if (!open) return null;

  function handleUpgrade() {
    setSettings({ plan: 'pro', proTrial: true });
    onClose();
  }

  const message = reason === 'limit' 
    ? 'Limite atteinte (10 sur Free). Passez en Pro pour illimité.'
    : 'Export CSV/XLSX disponible uniquement en Pro.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="card max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Passer en Pro</h3>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm">Abonnements illimités</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm">Export CSV et XLSX</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm">Analytics avancées</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm">Features à venir</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-ghost flex-1">
            Plus tard
          </button>
          <button onClick={handleUpgrade} className="btn btn-primary flex-1">
            Activer Pro (démo)
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Version démo — Pas de paiement requis
        </p>
      </div>
    </div>
  );
}

