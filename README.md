# E-commerce Simples com Stripe (Sandbox)

Um projeto de e-commerce minimalista para portfolio com integração de pagamentos via Stripe em modo sandbox.

![E-commerce Stripe Screenshot](https://via.placeholder.com/800x400.png?text=E-commerce+Stripe)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js (Next.js para otimização e SSR)
- **Backend**: Node.js (Express.js)
- **Hospedagem**: Vercel (Frontend) e Railway/Render (Backend)
- **Pagamentos**: API Stripe (Modo Sandbox)

## ✨ Funcionalidades

- ✅ **Listagem de Produtos**: Produtos pré-definidos no código para simulação.
- ✅ **Busca e Filtros**: Filtros simples por categoria.
- ✅ **Integração com Stripe**: Pagamentos processados via API da Stripe no modo sandbox.
- ✅ **Interface Responsiva**: Design otimizado para desktop e mobile.
- ✅ **SSR e Otimização**: Next.js para melhor desempenho e SEO.

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no Stripe para obter as chaves de API (sandbox)

### Configuração do Backend

1. Clone o repositório
```bash
git clone https://github.com/evertonethan/techshop-lite.git
cd e-commerce-stripe/backend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
   - Renomeie o arquivo `.env.example` para `.env`
   - Adicione suas chaves do Stripe e outras configurações

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### Configuração do Frontend

1. Navegue para a pasta do frontend
```bash
cd ../frontend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
   - Renomeie o arquivo `.env.local.example` para `.env.local`
   - Ajuste as URLs da API e a chave pública do Stripe

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Acesse o projeto em [http://localhost:3000](http://localhost:3000)

## 🔒 Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API no modo de teste (sandbox)
3. Configure as chaves no arquivo `.env` do backend e `.env.local` do frontend

## 🌐 Deploy

### Frontend (Vercel)

1. Conecte seu repositório no Vercel
2. Defina o diretório de construção como `frontend`
3. Configure as variáveis de ambiente necessárias

### Backend (Railway/Render)

1. Conecte seu repositório na plataforma escolhida
2. Defina o diretório de construção como `backend`
3. Configure as variáveis de ambiente necessárias

## 💡 Diferenciais

- 🚀 Simples e funcional, sem necessidade de banco de dados.
- ⚡ 100% Serverless, pronto para deploy no Vercel/Railway.
- 💳 Stripe Sandbox, simulação realista sem custos.

## 📚 Estrutura do Projeto

```
e-commerce-stripe/
├── frontend/         # Aplicação Next.js
│   ├── public/       # Arquivos estáticos
│   ├── src/          # Código-fonte
│   └── ...
└── backend/          # API Express.js
    ├── config/       # Configurações
    ├── controllers/  # Controladores
    ├── data/         # Dados mockados
    ├── routes/       # Rotas da API
    └── ...
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⚠️ **Nota**: Este é um projeto para portfolio e demonstração. Não utilize em ambiente de produção sem implementar recursos adicionais de segurança e validação.

Feito com ❤️ como exemplo de integração de pagamentos com Stripe.