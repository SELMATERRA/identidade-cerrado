# Plataforma Identidade Cerrado (MVP)

MVP funcional de plataforma educativa focada no bioma Cerrado com histórias, personagens, materiais didáticos e jogos interativos.

## Stack
- Next.js 14 + React 18 + TypeScript
- Tailwind CSS
- Supabase (auth + banco)
- Deploy pronto para Vercel

## Estrutura do projeto

```bash
.
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── supabase
│   └── schema.sql
├── tailwind.config.ts
├── tsconfig.json
└── src
    ├── app
    │   ├── admin/page.tsx
    │   ├── area-educativa/page.tsx
    │   ├── biblioteca/page.tsx
    │   ├── jogos/page.tsx
    │   ├── login/page.tsx
    │   ├── personagens/page.tsx
    │   ├── perfil/page.tsx
    │   ├── sobre/page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── admin
    │   │   ├── CharacterForm.tsx
    │   │   └── StoryForm.tsx
    │   ├── auth/LoginForm.tsx
    │   ├── games
    │   │   ├── CerradoQuiz.tsx
    │   │   ├── MemoryGame.tsx
    │   │   └── ProtectNatureGame.tsx
    │   ├── layout
    │   │   ├── Footer.tsx
    │   │   └── Navbar.tsx
    │   ├── sections/Hero.tsx
    │   └── ui/SectionTitle.tsx
    ├── lib
    │   ├── actions.ts
    │   ├── data.ts
    │   ├── supabaseClient.ts
    │   └── supabaseServer.ts
    └── types/index.ts
```

## Funcionalidades do MVP

### Páginas
- Home
- Sobre
- Biblioteca de histórias
- Personagens
- Área educativa (download de materiais)
- Jogos educativos
- Login e Perfil
- Painel Admin

### Jogos
1. Jogo da memória (animais do Cerrado)
2. Quiz do Cerrado
3. Arrastar e soltar (ações de proteção)

### Admin
- Cadastro de histórias
- Cadastro de personagens
- Listagem rápida de itens cadastrados
- Acesso restrito por role `admin`

## Banco de dados (Supabase)
1. Crie um projeto Supabase
2. Execute `supabase/schema.sql` no SQL Editor
3. Configure `.env.local` com:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Rodando localmente
```bash
npm install
npm run dev
```
Acesse: `http://localhost:3000`

## Deploy na Vercel
1. Suba o repositório para GitHub
2. Import no dashboard da Vercel
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Próximos passos sugeridos
- Upload de imagens e PDFs no Supabase Storage
- Recuperação de senha
- Edição/remoção de conteúdos no admin
- Métricas de uso e progresso de estudantes
