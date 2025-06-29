# 🌐 Projeto Fullstack - Consulta e Inserção de IPs

Aplicação fullstack com autenticação JWT, inserção e busca de IPs, cache inteligente e arquitetura em 3 camadas.

---

## 🚀 Tecnologias

- **Front-end:** React + React Router + Material UI
- **Back-end:** Node.js + Express + MongoDB + JWT
- **Extras:** apicache, express-validator, compression

---

## 🔐 Funcionalidades

- Login com autenticação por token (JWT)
- Busca de IP autenticada com salvamento no histórico
- Inserção de IP e nome manualmente
- Cache de 2 minutos na busca (apicache)
- Compressão de resposta e mensagens de erro claras
- Interface responsiva e visual moderno

---

##🔒 Segurança

- Middleware de autenticação com JWT
- Rate limit na rota de login (prevenção contra ataques automatizados)
- Validação robusta com express-validator
- Mensagens claras de erro vindas do servidor

---

## ▶️ Executando localmente

1. Clone o projeto e instale as dependências:

```bash
cd backend
npm install

cd frontend
npm install
````
2. Crie o arquivo .env no back-end com suas variáveis MongoURI e JWT Secret
3. Execute o arquivo createUser.js que cria uma massa no banco de dados para efetuar login.
4. Rode o back-end
5. Rode o Front-end
