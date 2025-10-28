'use client';

import { useStore } from '@/lib/store';
import { byCategoryMonthly, monthlyVsYearly } from '@/lib/analytics';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsPage() {
  const { subscriptions } = useStore();
  
  const categoryData = byCategoryMonthly(subscriptions);
  const cycleData = monthlyVsYearly(subscriptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
      </header>

      <main className="container py-8">
        <div className="space-y-8">
          {/* Pie Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Dépenses par Catégorie</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData as any}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">Aucune donnée à afficher</p>
            )}
          </div>

          {/* Bar Chart */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Comparaison Mensuel vs Annuel</h2>
            {cycleData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cycleData as any}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">Aucune donnée à afficher</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

