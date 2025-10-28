'use client';

import { useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { exportCSV, exportXLSX, exportJSON, parseJSON } from '@/lib/export';
import { UpgradeModal } from './UpgradeModal';

export function ExportMenu() {
  const { subscriptions, settings, importAll } = useStore();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport(format: 'csv' | 'xlsx' | 'json') {
    if (subscriptions.length === 0) {
      alert('Aucun abonnement à exporter');
      return;
    }

    // Check plan for CSV/XLSX
    if ((format === 'csv' || format === 'xlsx') && settings.plan === 'free') {
      setUpgradeModalOpen(true);
      return;
    }

    switch (format) {
      case 'csv':
        exportCSV(subscriptions);
        break;
      case 'xlsx':
        exportXLSX(subscriptions);
        break;
      case 'json':
        exportJSON(subscriptions);
        break;
    }
  }

  function handleImport() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const subs = await parseJSON(file);
      if (confirm(`Importer ${subs.length} abonnement(s) ? Les données actuelles seront remplacées.`)) {
        importAll(subs);
        alert('Import réussi!');
      }
    } catch (error) {
      alert('Erreur lors de l\'import du fichier.');
      console.error(error);
    }
    
    e.target.value = '';
  }

  const isFree = settings.plan === 'free';

  return (
    <>
      <UpgradeModal 
        open={upgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)} 
        reason="export"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleExport('csv')}
          disabled={subscriptions.length === 0 || isFree}
          className="btn btn-ghost text-sm disabled:opacity-50"
          title={isFree ? "Disponible en Pro" : "Export CSV"}
        >
          📊 CSV
        </button>
        <button
          onClick={() => handleExport('xlsx')}
          disabled={subscriptions.length === 0 || isFree}
          className="btn btn-ghost text-sm disabled:opacity-50"
          title={isFree ? "Disponible en Pro" : "Export XLSX"}
        >
          📈 XLSX
        </button>
        <button
          onClick={() => handleExport('json')}
          disabled={subscriptions.length === 0}
          className="btn btn-ghost text-sm disabled:opacity-50"
        >
          📤 JSON
        </button>
        <button
          onClick={handleImport}
          className="btn btn-ghost text-sm"
        >
          📥 Importer
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </>
  );
}
