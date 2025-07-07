import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import { Plus, Save } from 'lucide-react';

const formSchema = z.object({
  localidade: z.string().min(1, 'Localidade é obrigatória'),
  totalImoveis: z.number().min(1, 'Total de imóveis deve ser maior que 0'),
  imoveisTrabalhados: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  imoveisInformados: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  imoveisFechados: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  imoveisRecuperados: z.number().min(0, 'Valor deve ser maior ou igual a 0'),
  dataColeta: z.string().min(1, 'Data de coleta é obrigatória'),
  modalidadeTrabalho: z.string().min(1, 'Modalidade é obrigatória'),
  semanaEpidemiologica: z.number().min(1).max(53, 'Semana deve estar entre 1 e 53'),
  cicloAtividades: z.string().min(1, 'Ciclo é obrigatório'),
}).refine((data) => data.imoveisTrabalhados <= data.totalImoveis, {
  message: 'Imóveis trabalhados não pode ser maior que o total',
  path: ['imoveisTrabalhados'],
});

type FormData = z.infer<typeof formSchema>;

export function ManualEntryForm() {
  const { addData } = useData();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    addData(data);
    toast.success('Dados adicionados com sucesso!');
    reset();
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Entrada Manual de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="localidade">Localidade *</Label>
              <Select onValueChange={(value) => setValue('localidade', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a localidade" />
                </SelectTrigger>
                <SelectContent>
                  {localidades.map(localidade => (
                    <SelectItem key={localidade} value={localidade}>
                      {localidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.localidade && (
                <p className="text-sm text-red-500">{errors.localidade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalImoveis">Total de Imóveis *</Label>
              <Input
                id="totalImoveis"
                type="number"
                {...register('totalImoveis', { valueAsNumber: true })}
                placeholder="Ex: 1000"
              />
              {errors.totalImoveis && (
                <p className="text-sm text-red-500">{errors.totalImoveis.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imoveisTrabalhados">Imóveis Trabalhados *</Label>
              <Input
                id="imoveisTrabalhados"
                type="number"
                {...register('imoveisTrabalhados', { valueAsNumber: true })}
                placeholder="Ex: 850"
              />
              {errors.imoveisTrabalhados && (
                <p className="text-sm text-red-500">{errors.imoveisTrabalhados.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imoveisInformados">Imóveis Informados *</Label>
              <Input
                id="imoveisInformados"
                type="number"
                {...register('imoveisInformados', { valueAsNumber: true })}
                placeholder="Ex: 750"
              />
              {errors.imoveisInformados && (
                <p className="text-sm text-red-500">{errors.imoveisInformados.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imoveisFechados">Imóveis Fechados *</Label>
              <Input
                id="imoveisFechados"
                type="number"
                {...register('imoveisFechados', { valueAsNumber: true })}
                placeholder="Ex: 100"
              />
              {errors.imoveisFechados && (
                <p className="text-sm text-red-500">{errors.imoveisFechados.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imoveisRecuperados">Imóveis Recuperados *</Label>
              <Input
                id="imoveisRecuperados"
                type="number"
                {...register('imoveisRecuperados', { valueAsNumber: true })}
                placeholder="Ex: 50"
              />
              {errors.imoveisRecuperados && (
                <p className="text-sm text-red-500">{errors.imoveisRecuperados.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataColeta">Data de Coleta *</Label>
              <Input
                id="dataColeta"
                type="date"
                {...register('dataColeta')}
              />
              {errors.dataColeta && (
                <p className="text-sm text-red-500">{errors.dataColeta.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modalidadeTrabalho">Modalidade *</Label>
              <Select onValueChange={(value) => setValue('modalidadeTrabalho', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione modalidade" />
                </SelectTrigger>
                <SelectContent>
                  {modalidades.map(modalidade => (
                    <SelectItem key={modalidade} value={modalidade}>
                      {modalidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.modalidadeTrabalho && (
                <p className="text-sm text-red-500">{errors.modalidadeTrabalho.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="semanaEpidemiologica">Semana Epidemiológica *</Label>
              <Select onValueChange={(value) => setValue('semanaEpidemiologica', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a semana" />
                </SelectTrigger>
                <SelectContent>
                  {semanas.map(semana => (
                    <SelectItem key={semana} value={semana.toString()}>
                      Semana {String(semana).padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.semanaEpidemiologica && (
                <p className="text-sm text-red-500">{errors.semanaEpidemiologica.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cicloAtividades">Ciclo de Atividades *</Label>
              <Select onValueChange={(value) => setValue('cicloAtividades', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione ciclo" />
                </SelectTrigger>
                <SelectContent>
                  {ciclos.map(ciclo => (
                    <SelectItem key={ciclo} value={ciclo}>
                      {ciclo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cicloAtividades && (
                <p className="text-sm text-red-500">{errors.cicloAtividades.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => reset()}>
              Limpar
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar Dados
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}