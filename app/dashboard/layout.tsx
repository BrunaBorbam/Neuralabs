import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Neuralabs",
  description: "Gerenciador de leads, projetos e suporte",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {children}
    </div>
  );
}
