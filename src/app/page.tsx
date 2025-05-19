import PayrollCalculator from '@/components/payroll-calculator';
import JsonLd from './jsonld';

export const metadata = {
  alternates: {
    canonical: 'https://salario.ninja/',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-12 pb-20 px-4">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Calculadora de Folha de Pagamento</h1>
        <div className="flex items-center justify-center mb-3">
          <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2">salario.ninja</span>
        </div>
        <p className="text-muted-foreground text-lg">
          Calcule o salário líquido inserindo os detalhes abaixo
        </p>
      </header>
      
      <main className="w-full max-w-3xl">
        <PayrollCalculator />
        
        <div className="mt-16 bg-card shadow-lg rounded-xl overflow-hidden">
          <div className="bg-primary/5 p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-primary">Entenda o Cálculo da Folha de Pagamento</h2>
            <p className="text-muted-foreground mt-2">Saiba como funcionam os descontos e o cálculo do IRRF</p>
          </div>
          
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                O que é o IRRF?
              </h3>
              <p className="text-foreground leading-relaxed">
                O IRRF (Imposto de Renda Retido na Fonte) é um tributo federal que incide sobre rendimentos do trabalho assalariado. É calculado mensalmente sobre o salário bruto do trabalhador, após algumas deduções permitidas por lei.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Base de Cálculo do IRRF
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                A base de cálculo do IRRF é obtida a partir do salário bruto, subtraindo-se:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-foreground">
                <li>Contribuição previdenciária oficial (INSS)</li>
                <li>Dependentes (valor fixo mensal por dependente)</li>
                <li>Pensão alimentícia (quando aplicável)</li>
                <li>Dedução simplificada (opcional, quando vantajosa)</li>
              </ul>
            </section>
            
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-background p-5 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-1"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Tabela Progressiva do IRRF
                </h3>
                <p className="text-sm text-muted-foreground mb-3">A alíquota aplicada varia conforme a faixa salarial:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left">Base de Cálculo</th>
                        <th className="p-2 text-left">Alíquota</th>
                        <th className="p-2 text-left">Parcela a Deduzir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-2">Até R$ 2.259,20</td>
                        <td className="p-2">Isento</td>
                        <td className="p-2">R$ 0,00</td>
                      </tr>
                      <tr>
                        <td className="p-2">De R$ 2.259,21 até R$ 2.826,65</td>
                        <td className="p-2">7,5%</td>
                        <td className="p-2">R$ 169,44</td>
                      </tr>
                      <tr>
                        <td className="p-2">De R$ 2.826,66 até R$ 3.751,05</td>
                        <td className="p-2">15%</td>
                        <td className="p-2">R$ 381,44</td>
                      </tr>
                      <tr>
                        <td className="p-2">De R$ 3.751,06 até R$ 4.664,68</td>
                        <td className="p-2">22,5%</td>
                        <td className="p-2">R$ 662,77</td>
                      </tr>
                      <tr>
                        <td className="p-2">Acima de R$ 4.664,68</td>
                        <td className="p-2">27,5%</td>
                        <td className="p-2">R$ 896,00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section className="bg-background p-5 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-4"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Fórmula do IRRF
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium mb-1">1. Base de Cálculo:</p>
                    <div className="text-sm text-muted-foreground">Salário Bruto - INSS - (Dependentes x Valor por dependente)</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium mb-1">2. Alíquota:</p>
                    <div className="text-sm text-muted-foreground">Determinada pela faixa da Base de Cálculo</div>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <p className="font-medium mb-1">3. IRRF a pagar:</p>
                    <div className="text-sm text-muted-foreground">(Base de Cálculo x Alíquota) - Parcela a Deduzir</div>
                  </div>
                </div>
              </section>
            </div>
            
            <section>
              <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                Deduções e Benefícios
              </h3>
              <p className="text-foreground leading-relaxed mb-4">
                O cálculo do IRRF considera várias deduções que podem reduzir o imposto a pagar:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Dependentes</h4>
                  <p className="text-sm text-muted-foreground">Dedução fixa mensal por dependente (filhos, cônjuge, etc.), reduzindo a base de cálculo do imposto.</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Dedução Simplificada</h4>
                  <p className="text-sm text-muted-foreground">Opção que substitui todas as deduções por um desconto padrão, podendo ser mais vantajosa em alguns casos.</p>
                </div>
              </div>
            </section>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <h3 className="font-medium mb-2 flex items-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                Importante
              </h3>
              <p className="text-sm">
                Este calculador considera os valores e alíquotas atualizados conforme a legislação vigente. Para casos específicos ou especiais, consulte um contador ou profissional especializado.
              </p>
            </div>
            
            <section className="mt-12 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-4"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
                Desconto do INSS
              </h2>
              
              <p className="text-foreground leading-relaxed mb-6">
                O INSS (Instituto Nacional do Seguro Social) é uma contribuição obrigatória que incide sobre o salário do trabalhador para financiar a seguridade social. A contribuição do INSS é calculada de forma progressiva, com diferentes alíquotas aplicadas por faixas salariais.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <section className="bg-background p-5 rounded-lg border border-border h-full">
                  <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="8" x2="16" y1="12" y2="12"></line><line x1="12" x2="12" y1="8" y2="16"></line></svg>
                    Tabela Progressiva do INSS (2025)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Confira as alíquotas e faixas salariais atualizadas:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-2 text-left">Faixa Salarial</th>
                          <th className="p-2 text-left">Alíquota</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-2">Até R$ 1.518,00</td>
                          <td className="p-2">7,5%</td>
                        </tr>
                        <tr>
                          <td className="p-2">De R$ 1.518,01 até R$ 2.793,88</td>
                          <td className="p-2">9%</td>
                        </tr>
                        <tr>
                          <td className="p-2">De R$ 2.793,89 até R$ 4.190,83</td>
                          <td className="p-2">12%</td>
                        </tr>
                        <tr>
                          <td className="p-2">De R$ 4.190,84 até R$ 8.157,41</td>
                          <td className="p-2">14%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    * O valor máximo de contribuição é limitado ao teto do INSS (R$ 8.157,41).
                  </p>
                </section>
                
                <section className="bg-background p-5 rounded-lg border border-border h-full">
                  <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v8l4 2"></path></svg>
                    Como é calculado o INSS
                  </h3>
                  <div className="space-y-4">
                    <p className="text-sm text-foreground">
                      O cálculo do INSS é feito de forma progressiva, ou seja, cada faixa salarial é tributada com sua alíquota específica:
                    </p>
                    
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium text-xs mb-1 text-muted-foreground">Exemplo para salário de R$ 3.000,00:</p>
                      <ul className="text-sm space-y-1.5">
                        <li><span className="font-medium">Faixa 1:</span> 7,5% de R$ 1.518,00 = <span className="text-chart-1">R$ 113,85</span></li>
                        <li><span className="font-medium">Faixa 2:</span> 9% de R$ 1.275,88 = <span className="text-chart-1">R$ 114,83</span></li>
                        <li><span className="font-medium">Faixa 3:</span> 12% de R$ 206,12 = <span className="text-chart-1">R$ 24,73</span></li>
                        <li className="pt-1 border-t border-border"><span className="font-medium">Total INSS:</span> <span className="text-chart-1">R$ 253,41</span> (8,45% do salário)</li>
                      </ul>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      O desconto do INSS é realizado antes do cálculo do Imposto de Renda (IRRF).
                    </p>
                  </div>
                </section>
              </div>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Impacto do INSS no cálculo do IRRF
                  </h3>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm mb-3">
                      O valor descontado para o INSS é deduzido do salário bruto antes do cálculo do Imposto de Renda (IRRF), reduzindo a base de cálculo e, consequentemente, o valor do imposto a ser pago.
                    </p>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-medium mb-1 text-sm">Fluxo de cálculo:</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="px-3 py-1.5 bg-background rounded border border-border">Salário Bruto</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        <div className="px-3 py-1.5 bg-background rounded border border-border text-chart-1">Desconto INSS</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        <div className="px-3 py-1.5 bg-background rounded border border-border text-chart-1">Desconto IRRF</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        <div className="px-3 py-1.5 bg-background rounded border border-border text-chart-2">Salário Líquido</div>
                      </div>
                    </div>
                  </div>
                </section>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-4"><path d="m9 9-6 6v4h4l6-6"></path><path d="m16 7 1.5-1.5c.8-.8 2.2-.8 3 0 .8.8.8 2.2 0 3L19 10"></path><path d="m9 19-3.58 3.58a1.5 1.5 0 0 1-2.12-2.12L6.88 17"></path><path d="M14 4 3 15"></path></svg>
                      Limite do Teto
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Para salários acima do teto do INSS (R$ 8.157,41), o desconto máximo é limitado a aproximadamente R$ 951,62 (valor de 2025).
                    </p>
                  </div>
                  
                  <div className="flex-1 p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-chart-3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      Contribuição Mensal
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      O INSS é descontado mensalmente e proporcional aos dias trabalhados, em caso de admissão ou demissão no meio do mês.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-3xl mt-12 pt-6 border-t border-border text-center text-muted-foreground">
        <p>© 2026 <span className="font-medium">salario.ninja</span> - Sua ferramenta profissional de cálculo salarial</p>
      </footer>
      <JsonLd />
    </div>
  );
}
