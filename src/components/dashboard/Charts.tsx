import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function Charts() {
  const { filteredData } = useData();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#E5E7EB' : '#374151';
  const gridColor = isDark ? '#374151' : '#E5E7EB';

  const prepareBarChartData = () => {
    return filteredData.map(item => ({
      name: item.localidade,
      trabalhados: ((item.imoveisTrabalhados / item.totalImoveis) * 100).toFixed(1),
      informados: ((item.imoveisInformados / item.totalImoveis) * 100).toFixed(1),
      fechados: ((item.imoveisFechados / item.totalImoveis) * 100).toFixed(1),
      recuperados: ((item.imoveisRecuperados / item.totalImoveis) * 100).toFixed(1),
    }));
  };

  const preparePieChartData = () => {
    const totals = filteredData.reduce((acc, item) => ({
      trabalhados: acc.trabalhados + item.imoveisTrabalhados,
      informados: acc.informados + item.imoveisInformados,
      fechados: acc.fechados + item.imoveisFechados,
      recuperados: acc.recuperados + item.imoveisRecuperados,
    }), {
      trabalhados: 0,
      informados: 0,
      fechados: 0,
      recuperados: 0,
    });

    return [
      { name: 'Trabalhados', value: totals.trabalhados },
      { name: 'Informados', value: totals.informados },
      { name: 'Fechados', value: totals.fechados },
      { name: 'Recuperados', value: totals.recuperados },
    ];
  };

  const prepareLineChartData = () => {
    const weeklyData = filteredData.reduce((acc, item) => {
      const week = item.semanaEpidemiologica;
      if (!acc[week]) {
        acc[week] = {
          semana: week,
          cobertura: 0,
          count: 0,
        };
      }
      acc[week].cobertura += (item.imoveisTrabalhados / item.totalImoveis) * 100;
      acc[week].count += 1;
      return acc;
    }, {} as Record<number, { semana: number; cobertura: number; count: number }>);

    return Object.values(weeklyData).map(item => ({
      semana: `SE ${item.semana}`,
      cobertura: (item.cobertura / item.count).toFixed(1),
    }));
  };

  const barChartData = prepareBarChartData();
  const pieChartData = preparePieChartData();
  const lineChartData = prepareLineChartData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-foreground font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}${entry.name !== 'value' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Percentual por Localidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="trabalhados" fill="#3B82F6" name="Trabalhados" />
              <Bar dataKey="informados" fill="#10B981" name="Informados" />
              <Bar dataKey="fechados" fill="#F59E0B" name="Fechados" />
              <Bar dataKey="recuperados" fill="#EF4444" name="Recuperados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Distribuição Total</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Cobertura por Semana Epidemiológica</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="semana" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="cobertura" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}