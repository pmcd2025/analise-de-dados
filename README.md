# Sistema de Controle de Endemias - Análise de Dados de Campo

Um aplicativo web responsivo desenvolvido em React + TypeScript para análise de dados de campo das ações de controle de endemias.

## 🚀 Funcionalidades

### 📊 Dashboard Interativo
- Gráficos percentuais de cobertura
- Visualizações em barras, pizza e linha
- Estatísticas em tempo real
- Filtros avançados por semana epidemiológica, modalidade, localidade e ciclo

### 📝 Entrada de Dados
- **Formulário manual**: Interface intuitiva para digitação de dados
- **Importação de arquivos**: Suporte para Excel (.xlsx) e PDF (.pdf)
- **Validação automática**: Prevenção de erros de entrada

### 🎨 Interface Moderna
- **Design responsivo**: Mobile-first approach
- **Tema claro/escuro**: Alternância com preferência salva
- **Componentes acessíveis**: Baseados em shadcn/ui

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React
- **Build**: Vite

## 📋 Campos de Dados

### Campos Obrigatórios
- Localidade (62 bairros disponíveis)
- Número total de imóveis
- Imóveis trabalhados
- Imóveis informados
- Imóveis fechados
- Imóveis recuperados
- Data de coleta
- Modalidade de trabalho (LI, LI + T, PE, TR)
- Semana epidemiológica (01-53)
- Ciclo de atividades (01-06)

### Localidades Suportadas
```
Alemita, Alto Maron, Antique, Bananeira, Banco Raso, California,
Carlos Silva, Castalia, Centro, Centro Comercial, Conceicao,
Corbiniano Freire, Daniel Gomes, Fatima, Fernando Gomes, Ferradas,
Fonseca, Goes Calmon, Horteiro, Itamaraca, Jacana, Jardim Brasil,
Jardim Grapiuna, Jardim Primavera, Joao Soares, Jorge Amado,
Lomanto, Mangabinha, Manoel Leão, Maria Matos, Maria Pinheiro,
Monte Cristo, Mutuns, N S das Gracas, Nova California,
Nova Esperança, Nova Ferradas, Nova Itabuna, Nova Fonseca,
Novo Horizonte, Novo S Caetano, Parque Boa Vista, Parque Verde,
Pedro Geronimo, Pontalzinho, Roca do Povo, Santa Catarina,
Santa Clara, Santa Ines, Santo Antonio, Sao Caetano, Sao Judas,
Sao Lourenço, Sao Pedro, Sao Roque, Sarinha, Sinval Palmeira,
Taverolandia, Urbis IV, Vila Analia, Vila Paloma, Zildolandia, Zizo
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-controle-endemias.git

# Entre no diretório
cd sistema-controle-endemias

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

## 📱 Responsividade

O sistema foi desenvolvido com abordagem **mobile-first**, garantindo:
- Interface otimizada para dispositivos móveis
- Navegação por tabs em telas pequenas
- Gráficos responsivos
- Formulários adaptáveis

## 🎨 Temas

### Tema Claro
- Fundo branco/cinza claro
- Textos escuros
- Ideal para ambientes bem iluminados

### Tema Escuro
- Fundo escuro
- Textos claros
- Reduz fadiga visual em ambientes com pouca luz

## 📊 Tipos de Visualização

### Gráficos Disponíveis
1. **Barras**: Percentuais por localidade
2. **Pizza**: Distribuição total dos dados
3. **Linha**: Cobertura por semana epidemiológica
4. **Cards**: Estatísticas resumidas

### Filtros
- Semana epidemiológica (1-53)
- Modalidade de trabalho
- Localidade específica
- Ciclo de atividades

## 🔒 Validações

- Imóveis trabalhados ≤ Total de imóveis
- Campos obrigatórios verificados
- Formatos de data validados
- Números positivos apenas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido para otimizar o controle e análise de dados de campo em ações de combate a endemias.

---

**Sistema de Controle de Endemias** - Transformando dados de campo em insights acionáveis 📊