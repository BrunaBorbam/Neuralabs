'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, RefreshCw } from 'lucide-react';

type Diagnostico = {
  id: string;
  email: string;
  visitors: number;
  conversion_rate: number;
  ticket: number;
  annual_loss: number;
  created_at: string;
  whatsapp_sent: boolean;
};

const getSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
};

export default function DiagnosticosPage() {
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseClient();

  const fetchDiagnosticos = async () => {
    if (!supabase) {
      setError('Supabase não configurado. Configure as variáveis de ambiente.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: err } = await supabase
        .from('diagnosticos')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) {
        setError(`Erro ao carregar: ${err.message}`);
      } else {
        setDiagnosticos(data || []);
        setError(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnosticos();

    if (!supabase) return;

    const channel = supabase
      .channel('diagnosticos-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'diagnosticos' },
        () => fetchDiagnosticos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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
    <div className="min-h-screen bg-obsidian-900 text-pearl-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-black">CRM Neuralabs</h1>
              <p className="text-pearl-300/70 mt-2">Diagnósticos de conversão capturados</p>
            </div>
            <button
              onClick={fetchDiagnosticos}
              disabled={loading}
              className="p-2 rounded-lg bg-obsidian-800/40 border border-pearl-100/10 hover:bg-obsidian-800/60 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-blush-500/10 border border-blush-500/30 rounded-lg p-4">
            <p className="text-blush-300"><strong>⚠️ Erro:</strong> {error}</p>
            <p className="text-pearl-300/70 mt-2 text-sm">
              Verifique se: 1) A tabela foi criada no Supabase, 2) As variáveis de ambiente estão configuradas na Vercel
            </p>
          </div>
        )}

        {loading && !error ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mb-4"></div>
            <p className="text-pearl-300/70">Carregando diagnósticos...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 bg-obsidian-800/40 border border-pearl-100/10 rounded-lg p-4">
              <p className="text-pearl-300">
                Total de leads: <span className="text-gold-400 font-bold text-lg">{diagnosticos.length}</span>
              </p>
            </div>

            {diagnosticos.length === 0 ? (
              <div className="text-center py-16 bg-obsidian-800/40 rounded-lg border border-pearl-100/10">
                <p className="text-pearl-300/70">Nenhum diagnóstico capturado ainda</p>
                <p className="text-pearl-300/50 text-sm mt-2">Os diagnósticos aparecerão aqui quando usuários usarem a calculadora</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-pearl-100/10 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-obsidian-800/20 border-b border-pearl-100/10">
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Email</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Visitantes</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Taxa Conv.</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Ticket</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Perda Anual</th>
                      <th className="text-left py-4 px-4 text-sm text-pearl-300/70 font-semibold">Data</th>
                      <th className="text-center py-4 px-4 text-sm text-pearl-300/70 font-semibold">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosticos.map((diag, idx) => (
                      <tr
                        key={diag.id}
                        className="border-b border-pearl-100/5 hover:bg-obsidian-800/20 transition"
                      >
                        <td className="py-4 px-4 text-pearl-200 text-sm">{diag.email}</td>
                        <td className="py-4 px-4 text-pearl-200 text-sm">{diag.visitors.toLocaleString('pt-BR')}</td>
                        <td className="py-4 px-4 text-pearl-200 text-sm">{diag.conversion_rate.toFixed(2)}%</td>
                        <td className="py-4 px-4 text-pearl-200 text-sm">{formatCurrency(diag.ticket)}</td>
                        <td className="py-4 px-4 font-bold text-blush-300 text-sm">{formatCurrency(diag.annual_loss)}</td>
                        <td className="py-4 px-4 text-pearl-300/70 text-sm">
                          {new Date(diag.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => deleteDiagnostico(diag.id)}
                            className="text-blush-300 hover:text-blush-400 transition p-1"
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

        <div className="mt-8 p-4 bg-obsidian-800/40 border border-pearl-100/10 rounded-lg text-sm text-pearl-300/70">
          <p><strong>💡 Dica:</strong> Esse dashboard atualiza em tempo real quando novos diagnósticos chegam via calculadora.</p>
          <p className="mt-2"><strong>📱 Próximo:</strong> Configure notificações via WhatsApp usando Zapier ou Make seguindo o arquivo CRM_SETUP.md</p>
        </div>
      </div>
    </div>
  );
}
