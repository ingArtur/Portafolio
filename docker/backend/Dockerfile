FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY ../../package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY ../../server.js ./

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3001

CMD ["node", "server.js"]