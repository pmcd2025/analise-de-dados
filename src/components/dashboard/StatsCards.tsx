import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Home, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';

export function StatsCards() {
  const { filteredData } = useData();

  const calculateStats = () => {
    if (filteredData.length === 0) {
      return {
        percentualTrabalhados: 0,
        percentualInformados: 0,
        percentualFechados: 0,
        percentualRecuperados: 0,
        percentualCobertura: 0,
      };
    }

    const totals = filteredData.reduce((acc, item) => ({
      totalImoveis: acc.totalImoveis + item.totalImoveis,
      imoveisTrabalhados: acc.imoveisTrabalhados + item.imoveisTrabalhados,
      imoveisInformados: acc.imoveisInformados + item.imoveisInformados,
      imoveisFechados: acc.imoveisFechados + item.imoveisFechados,
      imoveisRecuperados: acc.imoveisRecuperados + item.imoveisRecuperados,
    }), {
      totalImoveis: 0,
      imoveisTrabalhados: 0,
      imoveisInformados: 0,
      imoveisFechados: 0,
      imoveisRecuperados: 0,
    });

    return {
      percentualTrabalhados: (totals.imoveisTrabalhados / totals.totalImoveis) * 100,
      percentualInformados: (totals.imoveisInformados / totals.totalImoveis) * 100,
      percentualFechados: (totals.imoveisFechados / totals.totalImoveis) * 100,
      percentualRecuperados: (totals.imoveisRecuperados / totals.totalImoveis) * 100,
      percentualCobertura: (totals.imoveisTrabalhados / totals.totalImoveis) * 100,
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Cobertura Geral',
      value: `${stats.percentualCobertura.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Imóveis Trabalhados',
      value: `${stats.percentualTrabalhados.toFixed(1)}%`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Imóveis Informados',
      value: `${stats.percentualInformados.toFixed(1)}%`,
      icon: Home,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Imóveis Fechados',
      value: `${stats.percentualFechados.toFixed(1)}%`,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}