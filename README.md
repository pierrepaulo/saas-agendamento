# Clinica PRO

Clinica PRO e uma aplicacao SaaS para agendamento online de clinicas e consultorios, com area publica para pacientes e painel privado para gestao da clinica.

## Principais funcionalidades
- Paginas publicas com lista de profissionais e pagina da clinica para agendamento.
- Painel autenticado para gerenciar servicos, agendamentos, lembretes e perfil.
- Autenticacao via NextAuth (GitHub/Google).
- Assinaturas com Stripe (checkout, portal do cliente e webhooks).
- Upload de imagem via Cloudinary.
- Validacao com Zod e formularios com React Hook Form.

## Publico-alvo e casos de uso
- Clinicas/consultorios que precisam publicar horarios e receber agendamentos online.
- Profissionais que desejam organizar agenda e servicos oferecidos.
- Pacientes que querem agendar horarios direto na pagina da clinica.
- Administracao de assinaturas e limites de planos para operacao SaaS.

## Stack e tecnologias
- Next.js App Router + React 19 + TypeScript (strict).
- Prisma + PostgreSQL.
- NextAuth (OAuth GitHub/Google).
- Stripe (checkout, portal, webhooks).
- Cloudinary (upload de imagens).
- Tailwind CSS + Radix UI.
- Zod, React Hook Form, React Query.

## Arquitetura e visao geral
- App Router com route groups `(public)` e `(panel)` para separar area publica e painel.
- Camadas por feature: `_components` (UI), `_actions` (Server Actions), `_data-access` (consultas).
- Infra em `src/lib` (Prisma, auth) e regras de negocio/integracoes em `src/utils`.
- API routes em `src/app/api/**/route.ts` para integracoes externas e consultas publicas.
- Prisma gera client em `src/generated/prisma` (nao editar).

## Requisitos
- Node.js + npm.
- Banco PostgreSQL acessivel.
- Credenciais OAuth para GitHub e/ou Google.
- Conta Stripe (e Stripe CLI para webhooks locais).
- Conta Cloudinary para upload de imagem.

## Como rodar localmente (passo a passo)
1. Instale as dependencias: `npm install`.
2. Crie o arquivo `.env` com as variaveis abaixo.
3. Configure o banco e rode as migrations: `npx prisma migrate dev`.
4. Inicie o servidor de desenvolvimento: `npm run dev`.
5. (Opcional) Ouvir webhooks do Stripe: `npm run stripe:listen`.

## Variaveis de ambiente (.env)
| Variavel | Descricao |
| --- | --- |
| AUTH_SECRET | Segredo do NextAuth. |
| DATABASE_URL | String de conexao Postgres. |
| AUTH_GITHUB_ID | Client ID do GitHub OAuth. |
| AUTH_GITHUB_SECRET | Client Secret do GitHub OAuth. |
| AUTH_GOOGLE_ID | Client ID do Google OAuth. |
| AUTH_GOOGLE_SECRET | Client Secret do Google OAuth. |
| NEXT_PUBLIC_URL | URL base da aplicacao (ex: http://localhost:3000). |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | Public key do Stripe. |
| STRIPE_SECRET_KEY | Secret key do Stripe. |
| STRIPE_SECRET_WEBHOOK_KEY | Signing secret do webhook Stripe. |
| STRIPE_PLAN_BASIC | ID do preco/plano Basic no Stripe. |
| STRIPE_PLAN_PROFISSIONAL | ID do preco/plano Professional no Stripe. |
| STRIPE_SUCCESS_URL | URL de sucesso do checkout. |
| STRIPE_CANCEL_URL | URL de cancelamento do checkout. |
| CLOUDINARY_NAME | Cloudinary cloud name. |
| CLOUDINARY_KEY | Cloudinary API key. |
| CLOUDINARY_SECRET | Cloudinary API secret. |

## Regras de negocio importantes (do agendamento)
- A clinica define os horarios disponiveis no perfil (`User.times`).
- O agendamento usa data (UTC) e hora separadas; a data eh normalizada para 00:00 UTC.
- A duracao do servico define quantos slots de 30 minutos sao bloqueados.
- O endpoint publico de agenda calcula horarios indisponiveis com base nos agendamentos existentes e na duracao do servico.
- Criacao de servicos respeita limites por plano e periodo de teste:
  - Trial de 3 dias.
  - Basic: maximo de 3 servicos.
  - Professional: maximo de 50 servicos.

## Estrutura de pastas
- `src/app`: App Router, layouts e APIs.
- `src/app/(public)`: paginas publicas e fluxo de agendamento.
- `src/app/(panel)`: painel autenticado (dashboard, servicos, planos, perfil).
- `src/app/**/_actions`: Server Actions por feature.
- `src/app/**/_data-access`: consultas de dados por feature.
- `src/app/**/_components`: componentes locais por feature.
- `src/components`: componentes compartilhados (UI e providers).
- `src/lib`: infraestrutura (auth, prisma).
- `src/providers`: providers de contexto.
- `src/utils`: regras de negocio, permissoes e integracoes.
- `prisma`: schema e migrations.
- `src/generated/prisma`: Prisma Client gerado.
- `public`: assets estaticos.
- `types`: tipos compartilhados.

## Scripts disponiveis
- `npm run dev`: inicia o Next.js em modo desenvolvimento.
- `npm run build`: gera Prisma Client, aplica migrations e gera build.
- `npm run start`: inicia o servidor de producao.
- `npm run lint`: executa ESLint.
- `npm run stripe:listen`: encaminha webhooks Stripe para `/api/webhook`.
- `npm run postinstall`: gera Prisma Client apos instalar dependencias.
