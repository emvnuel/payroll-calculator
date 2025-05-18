'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, DollarSign, Percent, Users, MinusCircle, History, ArrowUp, BarChart } from 'lucide-react';
import PayrollHistory from './payroll-history';
import SalaryCharts from './salary-charts';
import { PayrollHistoryEntry } from '@/types/payroll';

// Form schema with validations
const formSchema = z.object({
  grossPay: z.number().positive('O salário bruto deve ser positivo'),
  numberOfDependents: z.number().int().min(0, 'O número de dependentes não pode ser negativo'),
  fixedAmountDiscount: z.number().min(0, 'O desconto fixo não pode ser negativo'),
  percentangeDiscount: z.number().min(0, 'O percentual não pode ser negativo').max(100, 'O percentual máximo é 100%'),
  simplifiedDeduction: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

// API response type
type PayrollResponse = {
  grossPay: number;
  netPay: number;
  totalDiscount: number;
  discounts: {
    name: string;
    value: number;
  }[];
};

type ApiError = {
  status: number;
  message: string;
};

export default function PayrollCalculator() {
  const [result, setResult] = useState<PayrollResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grossPay: undefined,
      numberOfDependents: 0,
      fixedAmountDiscount: 0,
      percentangeDiscount: 0,
      simplifiedDeduction: false,
    },
  });

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveToHistory = (formData: FormValues, resultData: PayrollResponse) => {
    // Only run on the client side
    if (typeof window !== 'undefined') {
      const historyEntry: PayrollHistoryEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        formData: {
          grossPay: formData.grossPay,
          numberOfDependents: formData.numberOfDependents,
          fixedAmountDiscount: formData.fixedAmountDiscount,
          percentangeDiscount: formData.percentangeDiscount,
          simplifiedDeduction: formData.simplifiedDeduction
        },
        result: resultData
      };
      
      let history: PayrollHistoryEntry[] = [];
      let savedHistory = null;
      
      if (typeof window !== 'undefined') {
        const storage = window.localStorage;
        savedHistory = storage.getItem('payrollHistory');
      }
      
      if (savedHistory) {
        try {
          history = JSON.parse(savedHistory);
        } catch (e) {
          console.error('Failed to parse history:', e);
        }
      }
      
      // Add new entry to history
      history.unshift(historyEntry);
      
      // Limit history to 50 entries
      if (history.length > 50) {
        history = history.slice(0, 50);
      }
      
      // Save back to localStorage
      if (typeof window !== 'undefined') {
        const storage = window.localStorage;
        storage.setItem('payrollHistory', JSON.stringify(history));
      }
    }
  };

  const handleHistoryEntry = (entry: PayrollHistoryEntry) => {
    // Set form values from history
    setValue('grossPay', entry.formData.grossPay);
    setValue('numberOfDependents', entry.formData.numberOfDependents);
    setValue('fixedAmountDiscount', entry.formData.fixedAmountDiscount);
    setValue('percentangeDiscount', entry.formData.percentangeDiscount);
    setValue('simplifiedDeduction', entry.formData.simplifiedDeduction);
    
    // Hide history
    setShowHistory(false);
    
    // Scroll to top of the calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    setApiError(null);
    setResult(null);

    try {
      // Construct URL with query parameters
      const url = new URL('https://payroll.awesomeapps.cloud/payroll', window.location.origin);
      url.searchParams.append('grossPay', formData.grossPay.toString());
      url.searchParams.append('numberOfDependents', formData.numberOfDependents.toString());
      url.searchParams.append('fixedAmountDiscount', formData.fixedAmountDiscount.toString());
      url.searchParams.append('percentangeDiscount', (formData.percentangeDiscount / 100).toString());
      url.searchParams.append('simplifiedDeduction', formData.simplifiedDeduction.toString());

      // Call the API
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao calcular salário');
      }

      const data = await response.json();
      setResult(data);
      
      // Save to history
      saveToHistory(formData, data);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Erro ao calcular salário');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const scrollToTopHandler = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="bg-card shadow-lg rounded-xl overflow-hidden">
        {/* Form Section */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <DollarSign className="mr-2 text-primary" size={24} />
              Informações Salariais
            </h2>
            
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm",
                showHistory 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <History size={16} className="mr-1.5" />
              {showHistory ? "Ocultar Histórico" : "Ver Histórico"}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Gross Pay */}
            <div>
              <label htmlFor="grossPay" className="block text-sm font-medium mb-1">
                Salário Bruto <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <input
                  id="grossPay"
                  type="number"
                  step="0.01"
                  className={cn(
                    "w-full px-8 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                    errors.grossPay ? "border-destructive" : "border-input"
                  )}
                  {...register('grossPay', { 
                    valueAsNumber: true,
                    required: 'Salário bruto é obrigatório'
                  })}
                />
              </div>
              {errors.grossPay && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <AlertCircle size={14} className="mr-1" /> {errors.grossPay.message}
                </p>
              )}
            </div>

            {/* Number of Dependents */}
            <div>
              <label htmlFor="numberOfDependents" className="block text-sm font-medium mb-1">
                Número de Dependentes <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  id="numberOfDependents"
                  type="number"
                  min="0"
                  className={cn(
                    "w-full px-8 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                    errors.numberOfDependents ? "border-destructive" : "border-input"
                  )}
                  {...register('numberOfDependents', { 
                    valueAsNumber: true,
                    required: 'Número de dependentes é obrigatório'
                  })}
                />
              </div>
              {errors.numberOfDependents && (
                <p className="mt-1 text-sm text-destructive flex items-center">
                  <AlertCircle size={14} className="mr-1" /> {errors.numberOfDependents.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fixed Amount Discount */}
              <div>
                <label htmlFor="fixedAmountDiscount" className="block text-sm font-medium mb-1">
                  Desconto Fixo <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    R$
                  </span>
                  <input
                    id="fixedAmountDiscount"
                    type="number"
                    min="0"
                    step="0.01"
                    className={cn(
                      "w-full px-8 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                      errors.fixedAmountDiscount ? "border-destructive" : "border-input"
                    )}
                    {...register('fixedAmountDiscount', { 
                      valueAsNumber: true,
                      required: 'Desconto fixo é obrigatório'
                    })}
                  />
                </div>
                {errors.fixedAmountDiscount && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.fixedAmountDiscount.message}
                  </p>
                )}
              </div>

              {/* Percentage Discount */}
              <div>
                <label htmlFor="percentangeDiscount" className="block text-sm font-medium mb-1">
                  Desconto Percentual <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <input
                    id="percentangeDiscount"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    className={cn(
                      "w-full px-8 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:outline-none",
                      errors.percentangeDiscount ? "border-destructive" : "border-input"
                    )}
                    {...register('percentangeDiscount', { 
                      valueAsNumber: true,
                      required: 'Desconto percentual é obrigatório'
                    })}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Digite o percentual (ex: 10 para 10%)
                </p>
                {errors.percentangeDiscount && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.percentangeDiscount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Simplified Deduction Checkbox */}
            <div className="flex items-center">
              <input
                id="simplifiedDeduction"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register('simplifiedDeduction')}
              />
              <label htmlFor="simplifiedDeduction" className="ml-2 block text-sm">
                Dedução Simplificada
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={cn(
                "w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium transition-colors",
                "hover:bg-primary hover:bg-opacity-90",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Calculando..." : "Calcular Salário Líquido"}
            </button>
          </form>

          {/* Error Message */}
          {apiError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 border border-destructive bg-destructive bg-opacity-10 text-destructive rounded-md flex items-start"
            >
              <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="font-bold">Erro no cálculo</h3>
                <p>{apiError}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t border-border p-6 md:p-8 bg-muted bg-opacity-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <CheckCircle className="mr-2 text-chart-2" size={20} />
                  Resultado do Cálculo
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BarChart size={16} className="mr-1.5" />
                  <span>Visualização interativa disponível abaixo</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card p-4 rounded-md border border-border">
                  <h4 className="text-sm text-muted-foreground mb-1">Salário Bruto</h4>
                  <p className="text-xl font-bold">{formatCurrency(result.grossPay)}</p>
                </div>
                
                <div className="bg-card p-4 rounded-md border border-border">
                  <h4 className="text-sm text-muted-foreground mb-1">Total de Descontos</h4>
                  <p className="text-xl font-bold text-chart-1">{formatCurrency(result.totalDiscount)}</p>
                </div>
                
                <div className="bg-card p-4 rounded-md border border-border">
                  <h4 className="text-sm text-muted-foreground mb-1">Salário Líquido</h4>
                  <p className="text-xl font-bold text-chart-2">{formatCurrency(result.netPay)}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium text-muted-foreground mb-2 flex items-center">
                  <MinusCircle className="mr-2" size={16} />
                  Detalhes dos Descontos
                </h4>
                <ul className="space-y-2">
                  {result.discounts.map((discount, index) => (
                    <li 
                      key={index}
                      className="flex justify-between items-center p-3 bg-background rounded-md border border-border"
                    >
                      <span>{discount.name}</span>
                      <span className="font-medium text-chart-1">{formatCurrency(discount.value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Salary Visualization Charts */}
              <SalaryCharts 
                grossPay={result.grossPay}
                netPay={result.netPay}
                totalDiscount={result.totalDiscount}
                discounts={result.discounts}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* History Section */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <PayrollHistory onSelectEntry={handleHistoryEntry} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {scrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTopHandler}
            className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:bg-opacity-90"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
