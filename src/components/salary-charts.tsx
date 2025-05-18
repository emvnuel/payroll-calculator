'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// Industry average data (sample data)
const industryAverages = {
  'Tecnologia': 8500,
  'Finanças': 7800,
  'Saúde': 6200,
  'Educação': 4500,
  'Varejo': 3800,
};

interface SalaryChartsProps {
  grossPay: number;
  netPay: number;
  totalDiscount: number;
  discounts: {
    name: string;
    value: number;
  }[];
}

export default function SalaryCharts({
  grossPay,
  netPay,
  totalDiscount,
  discounts,
}: SalaryChartsProps) {
  const [activeChart, setActiveChart] = useState<'breakdown' | 'comparison' | 'detailed'>('breakdown');

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Pie chart data for salary breakdown
  const breakdownData = {
    labels: ['Salário Líquido', 'Total de Descontos'],
    datasets: [
      {
        data: [netPay, totalDiscount],
        backgroundColor: [
          'rgba(42, 145, 135, 0.8)',  // chart-2 color for net pay
          'rgba(232, 99, 67, 0.8)',   // chart-1 color for discounts
        ],
        borderColor: [
          'rgba(42, 145, 135, 1)',
          'rgba(232, 99, 67, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const breakdownOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'Geist Sans', sans-serif",
            size: 12,
          },
          color: '#71717A', // muted-foreground
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const percentage = ((value / grossPay) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    },
  };

  // Detailed pie chart data for all discounts
  const detailedData = {
    labels: [...discounts.map(d => d.name), 'Salário Líquido'],
    datasets: [
      {
        data: [...discounts.map(d => d.value), netPay],
        backgroundColor: [
          'rgba(232, 99, 67, 0.8)',   // chart-1
          'rgba(217, 182, 78, 0.8)',  // chart-4
          'rgba(230, 126, 51, 0.8)',  // chart-5
          'rgba(47, 63, 74, 0.8)',    // chart-3
          'rgba(42, 145, 135, 0.8)',  // chart-2
        ],
        borderColor: [
          'rgba(232, 99, 67, 1)',
          'rgba(217, 182, 78, 1)',
          'rgba(230, 126, 51, 1)',
          'rgba(47, 63, 74, 1)',
          'rgba(42, 145, 135, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for industry comparison
  const comparisonData = {
    labels: Object.keys(industryAverages),
    datasets: [
      {
        label: 'Média do Setor',
        data: Object.values(industryAverages),
        backgroundColor: 'rgba(113, 113, 122, 0.6)', // muted-foreground with opacity
        borderColor: 'rgba(113, 113, 122, 1)',
        borderWidth: 1,
      },
      {
        label: 'Seu Salário',
        data: Array(Object.keys(industryAverages).length).fill(grossPay),
        backgroundColor: 'rgba(42, 145, 135, 0.6)', // chart-2 with opacity
        borderColor: 'rgba(42, 145, 135, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const comparisonOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'Geist Sans', sans-serif",
            size: 12,
          },
          color: '#71717A', // muted-foreground
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            return `${context.dataset.label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-bold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
          <path d="M3 3v18h18"></path>
          <path d="m19 9-5 5-4-4-3 3"></path>
        </svg>
        Visualização do Salário
      </h3>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveChart('breakdown')}
          className={cn(
            "px-4 py-2 text-sm rounded-md transition-colors",
            activeChart === 'breakdown' 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveChart('detailed')}
          className={cn(
            "px-4 py-2 text-sm rounded-md transition-colors",
            activeChart === 'detailed' 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Descontos Detalhados
        </button>
        <button
          onClick={() => setActiveChart('comparison')}
          className={cn(
            "px-4 py-2 text-sm rounded-md transition-colors",
            activeChart === 'comparison' 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          Comparação com o Mercado
        </button>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[350px] flex items-center justify-center"
        >
          {activeChart === 'breakdown' && (
            <div className="w-full max-w-[220px] mx-auto">
              <Pie data={breakdownData} options={breakdownOptions} width={200} height={200} />
              <div className="mt-6 w-full flex justify-center">
                <div className="flex min-w-[340px] min-h-[100px]">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">Salário Líquido</p>
                  <p className="text-lg font-medium text-chart-2">{formatCurrency(netPay)}</p>
                  <p className="text-xs text-muted-foreground">
                    {((netPay / grossPay) * 100).toFixed(1)}% do salário bruto
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">Total de Descontos</p>
                  <p className="text-lg font-medium text-chart-1">{formatCurrency(totalDiscount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {((totalDiscount / grossPay) * 100).toFixed(1)}% do salário bruto
                  </p>
                </div>
                </div>
              </div>
            </div>
          )}

          {activeChart === 'detailed' && (
            <div className="w-full max-w-[220px] mx-auto">
              <Pie data={detailedData} options={breakdownOptions} width={200} height={200} />
              <div className="mt-6 grid grid-cols-1 gap-2">
                {discounts.map((discount, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="flex items-center">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: detailedData.datasets[0].backgroundColor[index] as string }}
                      ></span>
                      {discount.name}
                    </span>
                    <span className="font-medium">{formatCurrency(discount.value)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm pt-2 border-t border-border mt-2">
                  <span className="flex items-center">
                    <span 
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: detailedData.datasets[0].backgroundColor[discounts.length] as string }}
                    ></span>
                    Salário Líquido
                  </span>
                  <span className="font-medium text-chart-2">{formatCurrency(netPay)}</span>
                </div>
              </div>
            </div>
          )}

          {activeChart === 'comparison' && (
            <div className="w-full max-w-[220px] mx-auto">
              <Bar data={comparisonData} options={comparisonOptions} width={200} height={200} />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Seu salário bruto de {formatCurrency(grossPay)} comparado com médias do mercado
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
