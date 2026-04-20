# 🏦 CR Bank - Sistema Bancário Full Stack

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)

O **CR Bank** é uma plataforma de banco digital completa, desenvolvida para demonstrar habilidades em arquitetura de sistemas, segurança, comunicação em tempo real e interfaces de alta fidelidade.

## 🚀 Funcionalidades Principais

* **Motor de Pagamentos Pix:** Transferências instantâneas com validação de saldo e suporte a chaves (E-mail, CPF, Aleatória).
* **Cartão de Crédito Virtual 3D:** Interface imersiva com animação de flip e efeito Glassmorphism.
* **Notificações em Tempo Real:** Alertas de depósitos e transferências recebidas utilizando WebSockets (Socket.io).
* **Assistente Virtual Nativo:** Chatbot inteligente baseado em intenções para suporte ao cliente.
* **Gestão de Perfil Profissional:** Personalização de avatar (Base64) e edição de dados cadastrais.
* **Extrato Detalhado:** Histórico completo com geração de comprovantes e mascaramento de dados sensíveis (LGPD).

## 🛠️ Tecnologias Utilizadas

### Backend
* **Node.js & Express:** Servidor robusto com arquitetura de Controllers.
* **Prisma ORM:** Modelagem de dados e integração com PostgreSQL (Neon DB).
* **Socket.io:** Comunicação bidirecional para eventos em tempo real.
* **JWT & Bcrypt:** Autenticação segura e criptografia de senhas.

### Frontend
* **Next.js (App Router):** Framework moderno para performance e SEO.
* **TypeScript:** Segurança e tipagem estática em todo o projeto.
* **Styled-Components:** Estilização dinâmica e animações avançadas.
* **Socket.io-client:** Integração de eventos no lado do cliente.

## ⚙️ Configuração do Ambiente (.env)

O projeto utiliza variáveis de ambiente para garantir a segurança de dados sensíveis. No diretório raiz do backend, configure um arquivo `.env` seguindo o modelo:

```env
DATABASE_URL="sua_url_do_postgres_neon"
JWT_SECRET="sua_chave_secreta_para_tokens"
PORT=3333