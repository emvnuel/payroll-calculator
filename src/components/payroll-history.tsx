'use client';

import { useState, useEffect } from 'react';
import { PayrollHistoryEntry } from '@/types/payroll';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  CalendarIcon, 
  ArrowPathIcon, 
  TrashIcon, 
  ClockIcon,
  XMarkIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PayrollHistoryProps {
  onSelectEntry: (entry: PayrollHistoryEntry) => void;
}

export default function PayrollHistory({ onSelectEntry }: PayrollHistoryProps) {
  const [history, setHistory] = useState<PayrollHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<PayrollHistoryEntry | null>(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  
  useEffect(() => {
    const loadHistory = () => {
      const savedHistory = localStorage.getItem('payrollHistory');
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory) as PayrollHistoryEntry[];
          setHistory(parsed.sort((a, b) => b.timestamp - a.timestamp));
        } catch (e) {
          console.error('Failed to parse history:', e);
        }
      }
    };
    
    loadHistory();
  }, []);
  
  const deleteHistoryEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    
    if (typeof window !== 'undefined') {
      const storage = window.localStorage;
      storage.setItem('payrollHistory', JSON.stringify(updatedHistory));
    }
    
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };
  
  const clearAllHistory = () => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      const storage = window.localStorage;
      storage.removeItem('payrollHistory');
    }
    setSelectedEntry(null);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const paginatedHistory = history.slice(
    page * itemsPerPage, 
    (page * itemsPerPage) + itemsPerPage
  );
  
  const totalPages = Math.ceil(history.length / itemsPerPage);
  
  // If no history, show empty state
  if (history.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <ClockIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Nenhum histórico de cálculo</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Seus cálculos serão salvos aqui automaticamente para referência futura.
        </p>
      </div>
    );
  }

  // Show detail view
  if (selectedEntry) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-card border border-border rounded-lg overflow-hidden"
      >
        <div className="border-b border-border p-4 flex justify-between items-center">
          <button 
            onClick={() => setSelectedEntry(null)} 
            className="text-muted-foreground hover:text-foreground flex items-center text-sm"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Voltar ao histórico
          </button>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => onSelectEntry(selectedEntry)} 
              className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-md flex items-center"
            >
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Recalcular
            </button>
            <button 
              onClick={() => deleteHistoryEntry(selectedEntry.id)} 
              className="text-destructive hover:bg-destructive hover:text-white rounded-md p-1"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center text-sm text-muted-foreground mb-5">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            {format(new Date(selectedEntry.timestamp), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: pt })}
          </div>
          
          <div className="grid gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Parâmetros do Cálculo</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Salário Bruto</span>
                  <span className="font-medium">{formatCurrency(selectedEntry.formData.grossPay)}</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Dependentes</span>
                  <span className="font-medium">{selectedEntry.formData.numberOfDependents}</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Desconto Fixo</span>
                  <span className="font-medium">{formatCurrency(selectedEntry.formData.fixedAmountDiscount)}</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Desconto Percentual</span>
                  <span className="font-medium">{selectedEntry.formData.percentangeDiscount}%</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border col-span-2">
                  <span className="block text-xs text-muted-foreground mb-1">Dedução Simplificada</span>
                  <span className="font-medium">
                    {selectedEntry.formData.simplifiedDeduction ? "Sim" : "Não"}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Resultados</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Salário Bruto</span>
                  <span className="font-medium">{formatCurrency(selectedEntry.result.grossPay)}</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Total de Descontos</span>
                  <span className="font-medium text-chart-1">{formatCurrency(selectedEntry.result.totalDiscount)}</span>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">Salário Líquido</span>
                  <span className="font-medium text-chart-2">{formatCurrency(selectedEntry.result.netPay)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Detalhes dos Descontos</h4>
              <div className="space-y-2">
                {selectedEntry.result.discounts.map((discount, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-3 bg-background rounded-md border border-border"
                  >
                    <span className="text-sm">{discount.name}</span>
                    <span className="text-sm font-medium text-chart-1">{formatCurrency(discount.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Show history list
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="border-b border-border p-4 flex justify-between items-center">
        <h3 className="font-medium">Histórico de Cálculos</h3>
        {history.length > 0 && (
          <button 
            onClick={clearAllHistory} 
            className="text-sm text-destructive hover:text-opacity-70 flex items-center"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Limpar histórico
          </button>
        )}
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {paginatedHistory.map((entry) => (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-b border-border hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4 mr-1.5" />
                {format(new Date(entry.timestamp), "dd/MM/yyyy, HH:mm", { locale: pt })}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                  title="Ver detalhes"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectEntry(entry)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                  title="Recalcular"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteHistoryEntry(entry.id)}
                  className="p-1 text-muted-foreground hover:text-destructive"
                  title="Excluir"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <span className="block text-xs text-muted-foreground">Salário Bruto</span>
                <span className="font-medium">{formatCurrency(entry.formData.grossPay)}</span>
              </div>
              <div>
                <span className="block text-xs text-muted-foreground">Total Descontos</span>
                <span className="font-medium text-chart-1">{formatCurrency(entry.result.totalDiscount)}</span>
              </div>
              <div>
                <span className="block text-xs text-muted-foreground">Salário Líquido</span>
                <span className="font-medium text-chart-2">{formatCurrency(entry.result.netPay)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t border-border">
          <button
            disabled={page === 0}
            onClick={() => setPage(Math.max(0, page - 1))}
            className={cn(
              "flex items-center text-sm",
              page === 0 ? "text-muted-foreground cursor-not-allowed" : "hover:text-foreground"
            )}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {page + 1} de {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            className={cn(
              "flex items-center text-sm",
              page >= totalPages - 1 ? "text-muted-foreground cursor-not-allowed" : "hover:text-foreground"
            )}
          >
            Próxima
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
