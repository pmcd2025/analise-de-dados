import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useData } from '@/context/DataContext';
import { Filter, X } from 'lucide-react';

export function FilterPanel() {
  const { filters, updateFilters, resetFilters } = useData();

  // Generate epidemiological weeks (1-53)
  const semanas = Array.from({ length: 53 }, (_, i) => i + 1);

  // Modalities as requested
  const modalidades = ['LI', 'LI + T', 'PE', 'TR'];

  // Localities as requested
  const localidades = [
    'Alemita',
    'Alto Maron',
    'Antique',
    'Bananeira',
    'Banco Raso',
    'California',
    'Carlos Silva',
    'Castalia',
    'Centro',
    'Centro Comercial',
    'Conceicao',
    'Corbiniano Freire',
    'Daniel Gomes',
    'Fatima',
    'Fernando Gomes',
    'Ferradas',
    'Fonseca',
    'Goes Calmon',
    'Horteiro',
    'Itamaraca',
    'Jacana',
    'Jardim Brasil',
    'Jardim Grapiuna',
    'Jardim Primavera',
    'Joao Soares',
    'Jorge Amado',
    'Lomanto',
    'Mangabinha',
    'Manoel Leão',
    'Maria Matos',
    'Maria Pinheiro',
    'Monte Cristo',
    'Mutuns',
    'N S das Gracas',
    'Nova California',
    'Nova Esperança',
    'Nova Ferradas',
    'Nova Itabuna',
    'Nova Fonseca',
    'Novo Horizonte',
    'Novo S Caetano',
    'Parque Boa Vista',
    'Parque Verde',
    'Pedro Geronimo',
    'Pontalzinho',
    'Roca do Povo',
    'Santa Catarina',
    'Santa Clara',
    'Santa Ines',
    'Santo Antonio',
    'Sao Caetano',
    'Sao Judas',
    'Sao Lourenço',
    'Sao Pedro',
    'Sao Roque',
    'Sarinha',
    'Sinval Palmeira',
    'Taverolandia',
    'Urbis IV',
    'Vila Analia',
    'Vila Paloma',
    'Zildolandia',
    'Zizo'
  ];

  // Cycles as requested (Ciclo 01-06)
  const ciclos = Array.from({ length: 6 }, (_, i) => `Ciclo ${String(i + 1).padStart(2, '0')}`);

  // Special values for "all" options to avoid empty strings
  const ALL_SEMANAS = "_all_semanas_";
  const ALL_MODALIDADES = "_all_modalidades_";
  const ALL_LOCALIDADES = "_all_localidades_";
  const ALL_CICLOS = "_all_ciclos_";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="semana">Semana Epidemiológica</Label>
            <Select 
              value={filters.semanaEpidemiologica?.toString() || ALL_SEMANAS} 
              onValueChange={(value) => updateFilters({ 
                semanaEpidemiologica: value === ALL_SEMANAS ? null : parseInt(value)
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a semana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_SEMANAS}>Todas as semanas</SelectItem>
                {semanas.map(semana => (
                  <SelectItem key={semana} value={semana.toString()}>
                    Semana {String(semana).padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalidade">Modalidade</Label>
            <Select 
              value={filters.modalidadeTrabalho || ALL_MODALIDADES} 
              onValueChange={(value) => updateFilters({ 
                modalidadeTrabalho: value === ALL_MODALIDADES ? '' : value 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_MODALIDADES}>Todas</SelectItem>
                {modalidades.map(modalidade => (
                  <SelectItem key={modalidade} value={modalidade}>
                    {modalidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localidade">Localidade</Label>
            <Select 
              value={filters.localidade || ALL_LOCALIDADES} 
              onValueChange={(value) => updateFilters({ 
                localidade: value === ALL_LOCALIDADES ? '' : value 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione localidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_LOCALIDADES}>Todas</SelectItem>
                {localidades.map(localidade => (
                  <SelectItem key={localidade} value={localidade}>
                    {localidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ciclo">Ciclo</Label>
            <Select 
              value={filters.cicloAtividades || ALL_CICLOS} 
              onValueChange={(value) => updateFilters({ 
                cicloAtividades: value === ALL_CICLOS ? '' : value 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione ciclo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CICLOS}>Todos</SelectItem>
                {ciclos.map(ciclo => (
                  <SelectItem key={ciclo} value={ciclo}>
                    {ciclo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}