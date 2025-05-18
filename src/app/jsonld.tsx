'use client';

import Script from 'next/script';
export default function JsonLd() {
  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'salario.ninja - Calculadora de Folha de Pagamento',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'BRL'
    },
    'description': 'Calcule o salário líquido, descontos de INSS e IRRF para funcionários com nossa calculadora de folha de pagamento online.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '156'
    }
  };
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'salario.ninja',
    'url': 'https://salario.ninja/',
    'logo': "https://picsum.photos/200",
    'sameAs': ['https://www.facebook.com/calculadorafolha', 'https://twitter.com/calcfolha', 'https://www.linkedin.com/company/equipe-payroll']
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [{
      '@type': 'Question',
      'name': 'Como é calculado o INSS?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'O INSS é calculado de forma progressiva, com alíquotas que variam de 7,5% a 14% conforme faixas salariais. Cada faixa salarial é tributada com sua alíquota específica.'
      }
    }, {
      '@type': 'Question',
      'name': 'Como é calculado o IRRF?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'O IRRF é calculado sobre o salário bruto menos deduções (INSS, dependentes, etc). Aplica-se a alíquota correspondente à faixa salarial e subtrai-se a parcela a deduzir.'
      }
    }, {
      '@type': 'Question',
      'name': 'O que é dedução simplificada?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'A dedução simplificada é uma opção que substitui todas as deduções por um desconto padrão, podendo ser mais vantajosa em alguns casos.'
      }
    }]
  };
  return <>
      <Script id="calculator-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(calculatorSchema)
    }} />
      <Script id="organization-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(organizationSchema)
    }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema)
    }} />
    </>;
}