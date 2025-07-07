import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';

export function FileImport() {
  const { importData } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não suportado. Use apenas .xlsx ou .pdf');
      return;
    }

    // Simulate file processing
    toast.info('Processando arquivo...');
    
    // Simulate async processing
    setTimeout(() => {
      // Mock data import - in real app, this would parse the actual file
      const mockImportedData = [
        {
          id: Date.now().toString(),
          localidade: 'Importado - ' + file.name.split('.')[0],
          totalImoveis: 500,
          imoveisTrabalhados: 420,
          imoveisInformados: 380,
          imoveisFechados: 40,
          imoveisRecuperados: 20,
          dataColeta: new Date().toISOString().split('T')[0],
          modalidadeTrabalho: 'LIRAa',
          semanaEpidemiologica: 5,
          cicloAtividades: 'Ciclo 1',
          createdAt: new Date().toISOString(),
        }
      ];

      importData(mockImportedData);
      toast.success(`Arquivo "${file.name}" importado com sucesso!`);
      
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Importação de Arquivos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Faça upload dos seus arquivos
                </h3>
                <p className="text-gray-600 mt-1">
                  Arraste e solte ou clique para selecionar
                </p>
              </div>

              <Button onClick={handleUploadClick} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Selecionar Arquivo
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">Formatos Suportados</h4>
                <ul className="text-sm text-amber-800 mt-1 space-y-1">
                  <li>• Arquivos Excel (.xlsx)</li>
                  <li>• Arquivos PDF (.pdf)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Campos Obrigatórios</h4>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Localidade</li>
                  <li>• Número total de imóveis</li>
                  <li>• Imóveis trabalhados</li>
                  <li>• Imóveis informados</li>
                  <li>• Imóveis fechados</li>
                  <li>• Imóveis recuperados</li>
                  <li>• Data de coleta</li>
                  <li>• Modalidade de trabalho</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}