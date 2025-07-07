import React, { createContext, useContext, useState, useEffect } from 'react';
import { FieldData, FilterState } from '@/types';

interface DataContextType {
  data: FieldData[];
  filteredData: FieldData[];
  filters: FilterState;
  addData: (newData: Omit<FieldData, 'id' | 'createdAt'>) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  importData: (importedData: FieldData[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialFilters: FilterState = {
  semanaEpidemiologica: null,
  modalidadeTrabalho: '',
  localidade: '',
  cicloAtividades: '',
};

// Sample data for demonstration with updated modalities and localities
const sampleData: FieldData[] = [
  {
    id: '1',
    localidade: 'Centro',
    totalImoveis: 1200,
    imoveisTrabalhados: 980,
    imoveisInformados: 850,
    imoveisFechados: 120,
    imoveisRecuperados: 10,
    dataColeta: '2024-01-15',
    modalidadeTrabalho: 'LI',
    semanaEpidemiologica: 3,
    cicloAtividades: 'Ciclo 01',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    localidade: 'Jardim Brasil',
    totalImoveis: 800,
    imoveisTrabalhados: 650,
    imoveisInformados: 520,
    imoveisFechados: 80,
    imoveisRecuperados: 50,
    dataColeta: '2024-01-16',
    modalidadeTrabalho: 'PE',
    semanaEpidemiologica: 3,
    cicloAtividades: 'Ciclo 01',
    createdAt: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    localidade: 'Santa Catarina',
    totalImoveis: 1500,
    imoveisTrabalhados: 1300,
    imoveisInformados: 1100,
    imoveisFechados: 150,
    imoveisRecuperados: 50,
    dataColeta: '2024-01-17',
    modalidadeTrabalho: 'LI + T',
    semanaEpidemiologica: 4,
    cicloAtividades: 'Ciclo 02',
    createdAt: '2024-01-17T09:15:00Z',
  },
  {
    id: '4',
    localidade: 'Nova California',
    totalImoveis: 950,
    imoveisTrabalhados: 820,
    imoveisInformados: 700,
    imoveisFechados: 90,
    imoveisRecuperados: 30,
    dataColeta: '2024-01-18',
    modalidadeTrabalho: 'TR',
    semanaEpidemiologica: 4,
    cicloAtividades: 'Ciclo 02',
    createdAt: '2024-01-18T11:20:00Z',
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FieldData[]>(sampleData);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [filteredData, setFilteredData] = useState<FieldData[]>(data);

  useEffect(() => {
    let filtered = data;

    if (filters.semanaEpidemiologica) {
      filtered = filtered.filter(item => item.semanaEpidemiologica === filters.semanaEpidemiologica);
    }

    if (filters.modalidadeTrabalho) {
      filtered = filtered.filter(item => item.modalidadeTrabalho === filters.modalidadeTrabalho);
    }

    if (filters.localidade) {
      filtered = filtered.filter(item => 
        item.localidade.toLowerCase().includes(filters.localidade.toLowerCase())
      );
    }

    if (filters.cicloAtividades) {
      filtered = filtered.filter(item => item.cicloAtividades === filters.cicloAtividades);
    }

    setFilteredData(filtered);
  }, [data, filters]);

  const addData = (newData: Omit<FieldData, 'id' | 'createdAt'>) => {
    const dataWithId: FieldData = {
      ...newData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setData(prev => [...prev, dataWithId]);
  };

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const importData = (importedData: FieldData[]) => {
    setData(prev => [...prev, ...importedData]);
  };

  return (
    <DataContext.Provider value={{
      data,
      filteredData,
      filters,
      addData,
      updateFilters,
      resetFilters,
      importData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};