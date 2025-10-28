'use client';

import { useStore, formatMoney, formatDate, daysUntil, normalizeMonthly } from '@/lib/store';
import clsx from 'clsx';

export function SubscriptionCard({ subscription }: { subscription: any }) {
  const { removeSub, setEditing, togglePause, settings } = useStore();
  const days = daysUntil(subscription.nextBilling);
  const monthlyEquiv = normalizeMonthly(subscription.price, subscription.cycle);

  // Progress bar calculation (0-100%)
  const getProgress = () => {
    const cycleDays = subscription.cycle === 'monthly' ? 30 : 365;
    const elapsed = cycleDays - Math.max(days, 0);
    return Math.max(0, Math.min(100, (elapsed / cycleDays) * 100));
  };

  function handleEdit() {
    setEditing(subscription);
  }

  function handleDelete() {
    if (confirm(`Supprimer l'abonnement "${subscription.name}" ?`)) {
      removeSub(subscription.id);
    }
  }

  function handleTogglePause() {
    togglePause(subscription.id);
  }

  const yearlyEquiv = subscription.cycle === 'yearly' ? subscription.price : subscription.price * 12;

  return (
    <div className={clsx(
      'card',
      subscription.paused && 'opacity-60 grayscale'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: subscription.color || '#3B82F6' }}
          />
          <div>
            <h3 className="font-semibold">{subscription.name}</h3>
            {subscription.category && (
              <span className="badge">{subscription.category}</span>
            )}
            {subscription.paused && (
              <span className="badge bg-yellow-100 text-yellow-800">En pause</span>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg">
            {formatMoney(subscription.price, subscription.currency || settings.currency, settings.locale)}
          </p>
          <p className="text-sm text-gray-500">
            /{subscription.cycle === 'monthly' ? 'mois' : 'an'}
          </p>
        </div>
      </div>

      {subscription.notes && (
        <p className="text-sm text-gray-600 mt-2">{subscription.notes}</p>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Prochaine facturation:</span>
          <span className={clsx('font-medium', days < 7 && 'text-red-600')}>
            {formatDate(subscription.nextBilling)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Jours restants:</span>
          <span className={clsx(
            'font-medium',
            days < 7 && 'text-red-600',
            days > 0 && days <= 14 && 'text-orange-600',
            days > 14 && 'text-green-600'
          )}>
            J-{days}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${getProgress()}%`,
              backgroundColor: days < 7 ? '#ef4444' : days <= 14 ? '#f59e0b' : '#10b981',
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-200">
          <div>
            <span className="text-gray-500">Équiv. mensuel:</span>
            <p className="font-medium">
              {formatMoney(monthlyEquiv, subscription.currency || settings.currency, settings.locale)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Équiv. annuel:</span>
            <p className="font-medium">
              {formatMoney(yearlyEquiv, subscription.currency || settings.currency, settings.locale)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={handleEdit} className="btn btn-ghost flex-1">
          Modifier
        </button>
        <button onClick={handleTogglePause} className="btn btn-ghost flex-1">
          {subscription.paused ? 'Reprendre' : 'Pause'}
        </button>
        <button onClick={handleDelete} className="btn btn-ghost text-red-600 hover:bg-red-50 flex-1">
          Supprimer
        </button>
      </div>
    </div>
  );
}
