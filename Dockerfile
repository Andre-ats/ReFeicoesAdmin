# Use uma imagem base com Node.js
FROM node:16-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para o container
COPY . .

# Exponha a porta do Vite (5173 é a porta padrão, mas Railway usa a porta definida por PORT)
EXPOSE 5173

# Rodar o comando de build para produção
RUN npm run build

# Rodar o Vite em modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
