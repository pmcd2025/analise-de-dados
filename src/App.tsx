import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/sonner';
import { DataProvider } from '@/context/DataContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { Charts } from '@/components/dashboard/Charts';
import { ManualEntryForm } from '@/components/forms/ManualEntryForm';
import { FileImport } from '@/components/import/FileImport';
import { DataTable } from '@/components/data/DataTable';
import { BarChart3, Plus, Upload, Database } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          
          <div className="container mx-auto px-4 py-8">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="manual" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Entrada Manual</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="import" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
                >
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Importação</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="data" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
                >
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Dados</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <FilterPanel />
                <StatsCards />
                <Charts />
              </TabsContent>

              <TabsContent value="manual">
                <ManualEntryForm />
              </TabsContent>

              <TabsContent value="import">
                <FileImport />
              </TabsContent>

              <TabsContent value="data">
                <DataTable />
              </TabsContent>
            </Tabs>
          </div>
          
          <Toaster />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;