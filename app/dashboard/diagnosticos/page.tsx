'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

type Diagnostico = {
  id: string;
  email: string;
  visitors: number;
  conversion_rate: number;
  ticket: number;
  annual_loss: number;
  created_at: string;
};

export default function DiagnosticosPage() {
  const [items, setItems] = useState<Diagnostico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/diagnosticos', { cache: 'no-store' });
      if (!response.ok) throw new Error('Não foi possível carregar os diagnósticos.');
      const payload: { data: Diagnostico[] } = await response.json();
      setItems(payload.data);
      setError(null);
    } catch {
      setError('Não foi possível acessar os dados com segurança.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void refresh(); }, []);

  return (
    <main className="min-h-screen bg-obsidian-900 p-6 text-pearl-100 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-black">CRM Neuralabs</h1>
            <p className="mt-2 text-pearl-300/70">Painel administrativo de leitura</p>
          </div>
          <button onClick={() => void refresh()} disabled={loading}
            aria-label="Atualizar diagnósticos"
            className="rounded-lg border border-pearl-100/20 p-3 disabled:opacity-50">
            <RefreshCw className={loading ? 'h-5 w-5 animate-spin' : 'h-5 w-5'} />
          </button>
        </div>
        {error && <p role="alert" className="mb-4 text-red-400">{error}</p>}
        {loading ? <p>Carregando...</p> :
          <div className="overflow-x-auto rounded-lg border border-pearl-100/20">
            <table className="w-full text-left text-sm">
              <thead className="bg-obsidian-800">
                <tr>{['E-mail', 'Visitantes', 'Taxa', 'Ticket', 'Perda estimada', 'Data'].map(
                  label => <th key={label} className="p-3">{label}</th>,
                )}</tr>
              </thead>
              <tbody>{items.map(item =>
                <tr key={item.id} className="border-t border-pearl-100/10">
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.visitors}</td>
                  <td className="p-3">{item.conversion_rate}%</td>
                  <td className="p-3">{item.ticket}</td>
                  <td className="p-3">{item.annual_loss}</td>
                  <td className="p-3">{new Date(item.created_at).toLocaleString('pt-BR')}</td>
                </tr>,
              )}</tbody>
            </table>
          </div>
        }
      </div>
    </main>
  );
}
