export interface FieldData {
  id: string;
  localidade: string;
  totalImoveis: number;
  imoveisTrabalhados: number;
  imoveisInformados: number;
  imoveisFechados: number;
  imoveisRecuperados: number;
  dataColeta: string;
  modalidadeTrabalho: string;
  semanaEpidemiologica: number;
  cicloAtividades: string;
  createdAt: string;
}

export interface FilterState {
  semanaEpidemiologica: number | null;
  modalidadeTrabalho: string;
  localidade: string;
  cicloAtividades: string;
}

export interface DashboardStats {
  percentualTrabalhados: number;
  percentualInformados: number;
  percentualFechados: number;
  percentualRecuperados: number;
  percentualCobertura: number;
}

export interface ChartData {
  name: string;
  value: number;
  percentage: number;
}