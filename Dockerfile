# Passo 1: Use uma imagem base com Node.js
FROM node:16-alpine

# Passo 2: Defina o diretório de trabalho no container
WORKDIR /app

# Passo 3: Copie o package.json e package-lock.json
COPY package*.json ./

# Passo 4: Instale as dependências
RUN npm install

# Passo 5: Copie o restante do código para o container
COPY . .

# Passo 6: Exponha a porta que o Vite usa (5173 por padrão)
EXPOSE 5173

# Passo 7: Execute o comando de build do Vite para produção
RUN npm run build

# Passo 8: Comando para iniciar o servidor do Vite em modo de desenvolvimento
CMD ["npm", "run", "dev"]