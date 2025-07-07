import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/context/DataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function DataTable() {
  const { filteredData } = useData();

  const getModalityColor = (modality: string) => {
    const colors = {
      'LIRAa': 'bg-blue-100 text-blue-800',
      'PE': 'bg-green-100 text-green-800',
      'RA': 'bg-purple-100 text-purple-800',
      'PVE': 'bg-orange-100 text-orange-800',
      'Tratamento': 'bg-red-100 text-red-800',
    };
    return colors[modality as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateCoverage = (trabalhados: number, total: number) => {
    return ((trabalhados / total) * 100).toFixed(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Coletados ({filteredData.length} registros)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Localidade</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Trabalhados</TableHead>
                <TableHead>Informados</TableHead>
                <TableHead>Fechados</TableHead>
                <TableHead>Recuperados</TableHead>
                <TableHead>Cobertura</TableHead>
                <TableHead>Modalidade</TableHead>
                <TableHead>SE</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.localidade}</TableCell>
                  <TableCell>{item.totalImoveis.toLocaleString()}</TableCell>
                  <TableCell>{item.imoveisTrabalhados.toLocaleString()}</TableCell>
                  <TableCell>{item.imoveisInformados.toLocaleString()}</TableCell>
                  <TableCell>{item.imoveisFechados.toLocaleString()}</TableCell>
                  <TableCell>{item.imoveisRecuperados.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {calculateCoverage(item.imoveisTrabalhados, item.totalImoveis)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getModalityColor(item.modalidadeTrabalho)}>
                      {item.modalidadeTrabalho}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.semanaEpidemiologica}</TableCell>
                  <TableCell>
                    {format(new Date(item.dataColeta), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}