'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2 } from 'lucide-react';

type Diagnostico = {
  id: string;
  email: string;
  visitors: number;
  conversionRate: number;
  ticket: number;
  annualLoss: number;
  created_at: string;
  whatsapp_sent: boolean;
};

const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(url, key);
};

export default function DiagnosticosPage() {
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let supabase;
  try {
    supabase = getSupabaseClient();
  } catch (e) {
    supabase = null;
  }

  useEffect(() => {
    if (!supabase) {
      setError('Supabase não configurado. Verifique as variáveis de ambiente.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const { data, error: err } = await supabase
          .from('diagnosticos')
          .select('*')
          .order('created_at', { ascending: false });

        if (err) throw err;
        setDiagnosticos(data || []);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const channel = supabase
      .channel('diagnosticos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'diagnosticos' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const fetchDiagnosticos = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase
        .from('diagnosticos')
        .select('*')
        .order('created_at', { ascending: false });
      setDiagnosticos(data || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
    }
  };

  const deleteDiagnostico = async (id: string) => {
    if (!supabase) return;
    try {
      await supabase.from('diagnosticos').delete().eq('id', id);
      fetchDiagnosticos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao deletar');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-black mb-2">CRM Neuralabs</h1>
          <p className="text-pearl-300/70">Diagnósticos de conversão capturados</p>
        </div>

        {error && (
          <div className="mb-6 bg-blush-500/10 border border-blush-500/30 rounded-lg p-4">
            <p className="text-blush-300"><strong>⚠️ Erro:</strong> {error}</p>
            <p className="text-pearl-300/70 mt-2 text-sm">Verifique se a tabela foi criada no Supabase seguindo o arquivo CRM_SETUP.md</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
            <p className="mt-4 text-pearl-300/70">Carregando diagnósticos...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 bg-obsidian-800/40 border border-pearl-100/10 rounded-lg p-4">
              <p className="text-pearl-300">
                Total de leads: <span className="text-gold-400 font-bold text-lg">{diagnosticos.length}</span>
              </p>
            </div>

            {diagnosticos.length === 0 ? (
              <div className="text-center py-12 bg-obsidian-800/40 rounded-lg border border-pearl-100/10">
                <p className="text-pearl-300/70">Nenhum diagnóstico capturado ainda</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-pearl-100/10">
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Email</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Visitantes</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Taxa Conversão</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Ticket Médio</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Perda Anual</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Data</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosticos.map((diag) => (
                      <tr key={diag.id} className="border-b border-pearl-100/5 hover:bg-obsidian-800/20 transition">
                        <td className="py-4 px-4 text-pearl-200">{diag.email}</td>
                        <td className="py-4 px-4 text-pearl-200">{diag.visitors.toLocaleString('pt-BR')}</td>
                        <td className="py-4 px-4 text-pearl-200">{diag.conversionRate.toFixed(2)}%</td>
                        <td className="py-4 px-4 text-pearl-200">{formatCurrency(diag.ticket)}</td>
                        <td className="py-4 px-4 font-bold text-blush-300">{formatCurrency(diag.annualLoss)}</td>
                        <td className="py-4 px-4 text-pearl-300/70 text-sm">
                          {new Date(diag.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => deleteDiagnostico(diag.id)}
                            className="text-blush-300 hover:text-blush-400 transition"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
