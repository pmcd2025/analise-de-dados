import React from 'react';
import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Sistema de Controle de Endemias</h1>
              <p className="text-blue-100 text-xs sm:text-sm">Análise de Dados de Campo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}