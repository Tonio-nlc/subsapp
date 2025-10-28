'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Subscription, Settings, AppState } from './types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getDemoData } from './demo';

const defaultSettings: Settings = {
  currency: 'EUR',
  locale: 'fr-FR',
  plan: 'free',
  proTrial: false,
  monthlyBudget: undefined,
};

export const useStore = create<AppState & {
  // Actions
  addSub: (sub: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSub: (id: string, sub: Partial<Omit<Subscription, 'id' | 'createdAt'>>) => void;
  removeSub: (id: string) => void;
  togglePause: (id: string) => void;
  setEditing: (sub: Subscription | null) => void;
  setSettings: (settings: Partial<Settings>) => void;
  seedDemo: () => void;
  clearAll: () => void;
  importAll: (subscriptions: Subscription[]) => void;
  editing: Subscription | null;
}>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      settings: defaultSettings,
      editing: null,

      addSub: (sub) => {
        const now = Date.now();
        const newSub: Subscription = {
          ...sub,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          subscriptions: [...state.subscriptions, newSub],
        }));
      },

      updateSub: (id, updates) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s
          ),
        }));
      },

      removeSub: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((s) => s.id !== id),
        }));
        const { editing } = get();
        if (editing?.id === id) {
          set({ editing: null });
        }
      },

      togglePause: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((s) =>
            s.id === id ? { ...s, paused: !s.paused, updatedAt: Date.now() } : s
          ),
        }));
      },

      setEditing: (sub) => {
        set({ editing: sub });
      },

      setSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      seedDemo: () => {
        const demoData = getDemoData();
        set({ subscriptions: demoData });
      },

      clearAll: () => {
        if (confirm('Voulez-vous tout effacer ? Cette action est irréversible.')) {
          set({ subscriptions: [], editing: null });
        }
      },

      importAll: (subs) => {
        set({ subscriptions: subs });
      },
    }),
    {
      name: 'subs-v1',
    }
  )
);

// Export helper functions from formatting
export * from './formatting';

export function formatDate(dateISO: string): string {
  try {
    return format(new Date(dateISO), 'dd MMM yyyy', { locale: fr });
  } catch {
    return dateISO;
  }
}
