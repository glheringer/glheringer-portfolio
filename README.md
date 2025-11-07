# Portfolio - Guilherme Heringer Cordeiro

> Portfólio profissional desenvolvido com React, TypeScript e Tailwind CSS, apresentando projetos, habilidades e informações de contato de forma moderna e responsiva.

## Sobre o Projeto

Este é meu portfólio pessoal, criado para apresentar meus projetos, habilidades técnicas e experiência profissional como Desenvolvedor de Software Pleno. O projeto foi desenvolvido com foco em performance, design moderno e experiência do usuário em todos os dispositivos.

## Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **Vite (Rolldown)** - Build tool ultra-rápida
- **React Router DOM** - Navegação entre páginas

### Estilização
- **Tailwind CSS 3** - Framework CSS utility-first
- **Tailwind Animate** - Animações com Tailwind
- **class-variance-authority** - Gerenciamento de variantes de componentes
- **clsx** & **tailwind-merge** - Utilitários para classes CSS

### UI Components
- **Radix UI** - Componentes acessíveis e não-estilizados
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog
  - Dropdown Menu, Hover Card, Popover, Select
  - Toast, Tooltip, e muitos outros
- **Lucide React** - Biblioteca de ícones moderna
- **Sonner** - Toast notifications elegantes

### State Management & Data
- **Zustand** - Gerenciamento de estado leve e eficiente
- **TanStack Query (React Query)** - Gerenciamento de estado assíncrono
- **React Hook Form** - Gerenciamento de formulários performático

### Temas
- **next-themes** - Sistema de temas dark/light mode

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para JavaScript/TypeScript
- **TypeScript ESLint** - Regras ESLint específicas para TypeScript
- **React Compiler** - Compilador experimental do React
- **Autoprefixer** - PostCSS plugin para vendor prefixes

## Estrutura do Projeto

```
glheringer-portfolio/
├── src/
│   ├── components/
│   │   ├── backgrounds/          # Componentes de background animados
│   │   │   ├── AnimatedDots.tsx
│   │   │   ├── GradientOrb.tsx
│   │   │   └── GridBackground.tsx
│   │   ├── layout/                # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                    # Componentes UI reutilizáveis (50+)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── features/                  # Features da aplicação
│   │   ├── about/
│   │   │   └── components/
│   │   │       └── About.tsx
│   │   ├── contact/
│   │   │   └── components/
│   │   │       └── Contact.tsx
│   │   ├── hero/
│   │   │   └── components/
│   │   │       └── Hero.tsx
│   │   ├── projects/
│   │   │   └── components/
│   │   │       └── Projects.tsx
│   │   ├── skills/
│   │   │   └── components/
│   │   │       └── Skills.tsx
│   │   └── theme/
│   │       ├── components/
│   │       │   └── ThemeToggle.tsx
│   │       └── store/
│   │           └── themeStore.ts
│   ├── hooks/                     # Custom React Hooks
│   │   └── use-mobile.tsx
│   ├── lib/                       # Utilitários e helpers
│   │   └── utils.ts
│   ├── pages/                     # Páginas da aplicação
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                    # Componente raiz
│   ├── index.css                  # Estilos globais e variáveis CSS
│   └── main.tsx                   # Entry point
├── public/
│   └── images/
│       └── profile.jpg
├── tailwind.config.ts             # Configuração do Tailwind
├── tsconfig.json                  # Configuração do TypeScript
├── vite.config.ts                 # Configuração do Vite
└── package.json
```

## Funcionalidades

### Seções do Portfólio

1. **Hero**
   - Apresentação inicial com nome e título
   - Call-to-actions para projetos e contato
   - Links para GitHub e LinkedIn
   - Background animado com dots e gradient orbs

2. **Sobre Mim**
   - Cards com diferenciais (Código Limpo, Design Moderno, Performance)
   - Biografia profissional completa
   - Foto de perfil com hover effect
   - Background com grid animado

3. **Habilidades**
   - Exibição de tecnologias organizadas por categoria
   - Animação sticky scroll com empilhamento de cards
   - Efeitos de escala e brightness durante scroll
   - Categorias: Frontend & Mobile, Backend & Database, Ferramentas & Metodologias

4. **Projetos**
   - Showcase de projetos profissionais
   - Cards com MagicCard effect (gradiente no hover)
   - Tags de tecnologias utilizadas
   - Links para demo e código fonte
   - Grid responsivo adaptável

5. **Contato**
   - Informações de contato (email, telefone, localização)
   - Botão direto para envio de email
   - Layout otimizado para diferentes dispositivos

### Recursos Especiais

- **Dark Mode/Light Mode**: Sistema completo de temas
- **Responsividade Total**: Otimizado para mobile, tablet e desktop
- **Animações Suaves**: Fade-in, hover effects, scroll animations
- **Performance**: Build otimizado com code splitting
- **Acessibilidade**: Componentes Radix UI com suporte total a a11y
- **SEO Friendly**: Estrutura semântica e meta tags

## Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/glheringer/glheringer-portfolio.git
cd glheringer-portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Cria build de produção
npm run build

# Preview do build de produção
npm run preview

# Executa o linter
npm run lint
```

## Responsividade

O projeto foi otimizado para diferentes tamanhos de tela com breakpoints específicos:

| Breakpoint | Tamanho | Dispositivos |
|------------|---------|--------------|
| `sm` | 640px+ | Tablets pequenos |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |
| `2xl` | 1400px+ | Telas grandes |

### Otimizações Mobile-First

- Textos escaláveis de `text-xs` a `xl:text-7xl`
- Padding e spacing responsivos
- Grids adaptáveis (1 coluna → 2 colunas → 3 colunas)
- Touch targets adequados (mínimo 44x44px)
- Imagens e ícones com tamanhos proporcionais
- Menu mobile com toggle hamburger

## Design System

### Cores
O projeto utiliza um sistema de cores baseado em variáveis CSS (HSL), suportando modo claro e escuro:

- **Primary**: Azul (#1a3b5d / #3b82f6)
- **Accent**: Laranja (#f77f5c)
- **Background**: Branco / Cinza escuro
- **Foreground**: Cinza escuro / Branco

### Tipografia
- Fonte: Inter (via font-feature-settings)
- Escala responsiva de tamanhos
- Line-height otimizado para legibilidade

### Espaçamento
- Sistema consistente baseado em múltiplos de 4px
- Padding e margins responsivos
- Border radius padrão: 0.75rem

## Performance

- **Build Size**: ~415KB (JS) + ~65KB (CSS)
- **Gzip**: ~130KB (JS) + ~12KB (CSS)
- **Build Time**: ~1.4s
- **Code Splitting**: Automático via Vite
- **Tree Shaking**: Habilitado
- **Lazy Loading**: Para componentes pesados

## Deploy

O projeto pode ser facilmente deployado em plataformas como:

- **Vercel** (recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **Railway**
- **Cloudflare Pages**

### Deploy na Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Execute o deploy
vercel
```

## Melhorias Futuras

- [ ] Adicionar blog com artigos técnicos
- [ ] Implementar sistema de analytics
- [ ] Adicionar mais projetos ao portfólio
- [ ] Criar seção de depoimentos
- [ ] Adicionar internacionalização (i18n)
- [ ] Implementar testes unitários e E2E
- [ ] Adicionar animações mais complexas (Framer Motion)

## Contato

**Guilherme Heringer Cordeiro**

- Email: guilhermeheringer1999@gmail.com
- Telefone: +55 (31) 99757-7741
- LinkedIn: [linkedin.com/in/glheringer](https://linkedin.com/in/glheringer)
- GitHub: [github.com/glheringer](https://github.com/glheringer)
- Localização: Ipatinga - Minas Gerais, Brasil

## Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com React, TypeScript e Tailwind CSS por Guilherme Heringer Cordeiro**
