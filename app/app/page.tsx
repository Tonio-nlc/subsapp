'use client';

import { useState, useMemo } from 'react';
import { useStore, normalizeMonthly, formatMoney } from '@/lib/store';
import { SubscriptionForm } from '@/components/SubscriptionForm';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { ExportMenu } from '@/components/ExportMenu';
import { UpgradeModal } from '@/components/UpgradeModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getUpcomingRenewals, getDuplicateServices, getDueThisWeek, daysUntilRenewal, byCategoryMonthly } from '@/lib/analytics';

export default function AppPage() {
  const {
    subscriptions,
    settings,
    setSettings,
    seedDemo,
    clearAll,
  } = useStore();
  
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'none' | 'duplicates' | 'due-week'>('none');

  // Calculate totals (excluding paused subscriptions)
  const activeSubs = subscriptions.filter((s) => !s.paused);
  const totalMonthly = activeSubs.reduce(
    (sum, s) => sum + normalizeMonthly(s.price, s.cycle),
    0
  );
  const totalYearly = activeSubs.reduce(
    (sum, s) => sum + (s.cycle === 'yearly' ? s.price : s.price * 12),
    0
  );

  // Dashboard analytics
  const avgPerSub = activeSubs.length > 0 ? totalMonthly / activeSubs.length : 0;
  const pausedCount = subscriptions.filter((s) => s.paused).length;
  const upcomingRenewals = getUpcomingRenewals(subscriptions);
  const duplicates = getDuplicateServices(subscriptions);
  const dueThisWeek = getDueThisWeek(subscriptions);
  const topCategory = byCategoryMonthly(activeSubs)[0];

  // Simple 6-month forecast
  const monthlyForecast = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      month: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
      value: totalMonthly,
    }));
  }, [totalMonthly]);

  // Delta vs last month (simplified - using current value)
  const delta = 0; // Would need historical data to calculate real delta

  const monthlyBudget = settings.monthlyBudget || 0;
  const budgetPercent = monthlyBudget > 0 ? Math.min(100, (totalMonthly / monthlyBudget) * 100) : 0;

  const isFree = settings.plan === 'free';
  const canAdd = !isFree || subscriptions.length < 10;
  const remainingSlots = isFree ? 10 - subscriptions.length : Infinity;

  // Filter subscriptions based on alert pills
  const filteredSubs = useMemo(() => {
    if (filterType === 'duplicates') {
      const nameMap = new Map<string, string[]>();
      activeSubs.forEach((sub) => {
        const name = sub.name.toLowerCase().trim();
        if (!nameMap.has(name)) nameMap.set(name, []);
        nameMap.get(name)!.push(sub.id);
      });
      const dupIds = new Set<string>();
      nameMap.forEach((ids) => {
        if (ids.length > 1) ids.forEach((id) => dupIds.add(id));
      });
      return subscriptions.filter((s) => dupIds.has(s.id));
    } else if (filterType === 'due-week') {
      return subscriptions.filter((s) => {
        const days = daysUntilRenewal(s.nextBilling);
        return days >= 0 && days <= 7 && !s.paused;
      });
    }
    return subscriptions;
  }, [subscriptions, filterType, activeSubs]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <UpgradeModal 
        open={upgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)} 
        reason="limit"
      />
      
      {/* Freemium Callout */}
      {isFree && subscriptions.length >= 8 && subscriptions.length < 10 && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
          <div className="container">
            <p className="text-sm text-zinc-700">
              Only {remainingSlots} {remainingSlots === 1 ? 'slot' : 'slots'} left before the 10 subscription limit.{' '}
              <button onClick={() => setUpgradeModalOpen(true)} className="text-blue-600 underline font-medium">
                Upgrade to Pro for unlimited
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900">My Subscriptions</h1>
            <ExportMenu />
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Monthly Card */}
          <div className="card">
            <p className="text-sm text-zinc-600 mb-1">Total Monthly</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-3xl font-bold text-blue-600">
                {formatMoney(totalMonthly, settings.currency, settings.locale)}
              </p>
              {delta !== 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${delta > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {delta > 0 ? '▲' : '▼'} {formatMoney(Math.abs(delta), settings.currency, settings.locale)}
                </span>
              )}
            </div>
            
            {/* Sparkline (simple visualization) */}
            <div className="h-8 mb-2 flex items-end gap-0.5">
              {monthlyForecast.map((point, i) => (
                <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${(point.value / totalMonthly) * 100}%` }} />
              ))}
            </div>

            {/* 3-KPI row */}
            <div className="grid grid-cols-3 gap-2 text-xs border-t pt-2">
              <div>
                <div className="text-zinc-500">Active</div>
                <div className="font-semibold text-zinc-900">{activeSubs.length}</div>
              </div>
              <div>
                <div className="text-zinc-500">Avg/sub</div>
                <div className="font-semibold text-zinc-900">{formatMoney(avgPerSub, settings.currency, settings.locale)}</div>
              </div>
              <div>
                <div className="text-zinc-500">Paused</div>
                <div className="font-semibold text-zinc-900">{pausedCount}</div>
              </div>
            </div>
          </div>

          {/* Total Yearly Card */}
          <div className="card">
            <p className="text-sm text-zinc-600 mb-1">Total Yearly</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-3xl font-bold text-green-600">
                {formatMoney(totalYearly, settings.currency, settings.locale)}
              </p>
            </div>
            
            {/* Mini stacked bars Monthly vs Yearly */}
            <div className="h-8 mb-2 flex gap-1">
              <div className="flex-1 bg-blue-200 rounded" />
              <div className="flex-1 bg-green-200 rounded" />
            </div>

            {/* Top 3 Upcoming Renewals */}
            {upcomingRenewals.length > 0 ? (
              <div className="space-y-1 text-xs border-t pt-2">
                {upcomingRenewals.map((sub) => (
                  <div key={sub.id} className="flex justify-between items-center">
                    <span className="truncate">{sub.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-white ${
                      sub.daysUntil <= 7 ? 'bg-red-500' : sub.daysUntil <= 14 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      J-{sub.daysUntil}
                    </span>
-Based                  </div>
                ))}
              </div>
            ) : topCategory && (
              <div className="text-xs border-t pt-2">
                <div className="text-zinc-500">Top category</div>
                <div className="font-semibold text-zinc-900">{topCategory.name}</div>
              </div>
            )}
          </div>

          {/* Settings Card */}
          <div className="card">
            <p className="text-sm text-zinc-600 mb-1">Settings</p>
            <div className="space-y-2 mt-2">
              <div>
                <label className="block text-xs text-zinc-600 mb-1">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ currency: e.target.value })}
                  className="input text-sm w-full"
                >
                  <option value="EUR">EUR - Euro</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="CHF">CHF - Swiss Franc</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="SEK">SEK - Swedish Krona</option>
                  <option value="NOK">NOK - Norwegian Krone</option>
                  <option value="DKK">DKK - Danish Krone</option>
                  <option value="PLN">PLN - Polish Zloty</option>
                  <option value="CZK">CZK - Czech Koruna</option>
                  <option value="HUF">HUF - Hungarian Forint</option>
                  <option value="TRY">TRY - Turkish Lira</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="MAD">MAD - Moroccan Dirham</option>
                  <option value="DZD">DZD - Algerian Dinar</option>
                  <option value="TND">TND - Tunisian Dinar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-600 mb-1">Locale</label>
                <input
                  type="text"
                  value={settings.locale}
                  onChange={(e) => setSettings({ locale: e.target.value })}
                  className="input text-sm"
                  placeholder="en-US"
                />
              </div>
              
              {/* Monthly Budget */}
              <div>
                <label className="block text-xs text-zinc-600 mb-1">Monthly Budget (optional)</label>
                <input
                  type="number"
                  value={monthlyBudget || ''}
                  onChange={(e) => setSettings({ monthlyBudget: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="input text-sm"
                  placeholder="0"
                />
                {monthlyBudget > 0 && (
                  <div className="mt-1">
                    <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                      <div className={`h-full ${budgetPercent >= 100 ? 'bg-red-500' : budgetPercent >= 80 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, budgetPercent)}%` }} />
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {budgetPercent.toFixed(0)}% used
                    </div>
                  </div>
                )}
              </div>

              {/* Email reminders toggle (disabled) */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <button disabled className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <div className="w-8 h-4 bg-zinc-200 rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5" />
                  </div>
                  <span className="text-xs text-zinc-600">Email reminders (soon)</span>
                </button>
              </div>

              {subscriptions.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all subscriptions? This action is irreversible.')) {
                      clearAll();
                    }
                  }}
                  className="btn btn-ghost text-red-600 hover:bg-red-50 w-full text-sm"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Alert Pills */}
        {(duplicates > 0 || dueThisWeek > 0) && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {duplicates > 0 && (
              <button
                onClick={() => setFilterType(filterType === 'duplicates' ? 'none' : 'duplicates')}
                className={`px-3 py-1.5 text-sm rounded-full border ${
                  filterType === 'duplicates' 
                    ? 'bg-orange-100 border-orange-300 text-orange-700' 
                    : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {duplicates} duplicate{duplicates > 1 ? 's' : ''}
              </button>
            )}
            {dueThisWeek > 0 && (
              <button
                onClick={() => setFilterType(filterType === 'due-week' ? 'none' : 'due-week')}
                className={`px-3 py-1.5 text-sm rounded-full border ${
                  filterType === 'due-week'
                    ? 'bg-red-100 border-red-300 text-red-700'
                    : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {dueThisWeek} due this week
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[520px_minmax(0,1fr)]">
          {/* Form Section */}
          <section className="min-w-0">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-zinc-900">Add Subscription</h2>
                {isFree && (
                  <span className="text-xs text-zinc-600">
                    {subscriptions.length}/10
                  </span>
                )}
              </div>
              {!canAdd ? (
                <div className="text-center py-8">
                  <p className="text-zinc-600 mb-4 text-sm">
                    Subscription limit reached
                  </p>
                  <button onClick={() => setUpgradeModalOpen(true)} className="btn btn-primary text-sm">
                    Upgrade to Pro
                  </button>
                </div>
              ) : (
                <SubscriptionForm
                  onDone={() => {}}
                />
              )}
            </div>
          </section>

          {/* List Section */}
          <section className="min-w-0">
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">
              My Subscriptions {filteredSubs.length > 0 && `(${filteredSubs.length})`}
            </h2>

            {filteredSubs.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-zinc-600 mb-4">
                  {filterType !== 'none' ? 'No matching subscriptions.' : 'No subscriptions yet.'}
                </p>
                {filterType !== 'none' && (
                  <button onClick={() => setFilterType('none')} className="btn btn-ghost text-sm mb-4">
                    Clear filter
                  </button>
                )}
                {subscriptions.length === 0 && (
                  <button onClick={seedDemo} className="btn btn-primary">
                    Load Demo Data
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubs.map((sub) => (
                  <SubscriptionCard key={sub.id} subscription={sub} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
