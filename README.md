# Sistema de Controle Epidemiológico (EpiData)

Este é o repositório do **EpiData**, um sistema de mapeamento e controle epidemiológico inteligente focado no monitoramento de endemias (como a Dengue) na cidade de Floriano, PI. O sistema oferece uma visão geoespacial das ocorrências, além de dashboards interativos para análise de dados e tomada de decisão.

---

## 🎯 Objetivo do Projeto

Fornecer à Secretaria de Saúde uma ferramenta tecnológica para:

- Monitoramento ativo e em tempo real de focos e casos suspeitos/confirmados.
- Mapeamento de calor georreferenciado com segmentação por zonas (UBSs).
- Visualização de curvas epidêmicas, perfil demográfico e status de casos.
- Controle eficiente de surtos e vetores em áreas urbanas e rurais.

---

## 🛠️ Tecnologias Utilizadas

O projeto adota uma arquitetura moderna dividida entre **Frontend** e **Backend**.

### Frontend

- **React.js** com **Vite**
- **Tailwind CSS** + **shadcn/ui** (para estilização e componentes de UI)
- **MapLibre GL JS** (para renderização de mapas geoespaciais e visões 3D)
- **Recharts** (para geração de gráficos no dashboard)
- **FullCalendar** (para gerenciamento de agendas/ações)
- **Lucide React** (para ícones)

### Backend (API)

- **Python** com **Django** / **Django REST Framework (DRF)**
- **SQLite** (banco de dados padrão para desenvolvimento)
- O backend serve como a API REST que fornece os dados dos pacientes e notificações extraídos do SINAN.

---

## 📂 Estrutura do Projeto

A estrutura principal do repositório está organizada da seguinte forma:

```
epidemiological-mapping-develop/
│
├── backend/                  # Código do servidor (API)
│   ├── api/                  # App principal do Django
│   │   ├── migrations/       # Arquivos de migração do banco de dados
│   │   ├── dbfs/             # Arquivos locais/raw de dados (e.g. .dbf)
│   │   ├── models.py         # Definição do modelo PacienteEndemia
│   │   ├── views.py          # Lógica das rotas da API
│   │   ├── urls.py           # Rotas do Django
│   │   └── settings.py       # Configurações do backend
│   └── manage.py             # CLI do Django
│
├── frontend/                 # Código da interface de usuário
│   ├── public/               # Ativos estáticos públicos
│   ├── src/
│   │   ├── assets/           # Imagens, logos e fotos das UBSs
│   │   ├── components/       # Componentes React reutilizáveis (Sidebar, Gráficos, Modal, etc.)
│   │   ├── lib/              # Funções utilitárias (e.g., utils.js)
│   │   ├── pages/            # Páginas da aplicação (Home, DashBoard, Mapas)
│   │   │   └── maps/         # Lógica específica dos mapas por agravo
│   │   ├── utils/            # Arquivos auxiliares (e.g., GeoJSONs de delimitação)
│   │   ├── App.jsx           # Configuração de Rotas
│   │   ├── index.css         # Estilos globais (Tailwind import)
│   │   └── main.jsx          # Ponto de entrada do React
│   ├── package.json          # Dependências do frontend
│   └── jsconfig.json
│
└── .gitignore                # Arquivos ignorados pelo Git
```

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o backend e o frontend em sua máquina local.

### 1. Configurando o Backend (Django)

1. Navegue até a pasta do backend:
   ```bash
   cd epidemiological-mapping-develop/backend/api
   ```
2. (Opcional, mas recomendado) Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts ctivate
   ```
3. Instale as dependências (certifique-se de ter o Django e o DRF instalados, ou instale via `requirements.txt` se disponível):
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
4. Aplique as migrações no banco de dados:
   ```bash
   python manage.py migrate
   ```
5. Inicie o servidor local:
   ```bash
   python manage.py runserver
   ```
   _A API estará disponível em `http://localhost:8000/`._

### 2. Configurando o Frontend (React/Vite)

1. Em um novo terminal, navegue até a pasta do frontend:
   ```bash
   cd epidemiological-mapping-develop/frontend
   ```
2. Instale as dependências do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   _A aplicação frontend abrirá (geralmente) em `http://localhost:5173/`._

---

## 📍 Principais Funcionalidades

- **Dashboard Integrado:** Visualização de KPIs (Total de notificações, Casos recentes), curva epidêmica e perfil demográfico.
- **Mapa Interativo (Geoespacial):**
  - Renderização da delimitação do perímetro urbano e rural de Floriano.
  - Marcadores de UBSs com informações e fotos da fachada.
  - Alternância de temas de mapa (Claro, Escuro, OpenStreetMap, Visão 3D).
  - Filtro por tipo de endemia (Dengue, Sífilis, Tuberculose).
- **Detalhes de Pacientes:** Modal interativo para verificar os dados do agravo de pacientes notificados, integrados diretamente via API.

---

## 📝 Licença e Direitos

Desenvolvido para auxiliar a gestão epidemiológica de Floriano, PI.
© Secretaria de Saúde 2026. Todos os direitos reservados.
