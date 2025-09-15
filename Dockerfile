# Multi-stage build para optimizar tamaño
FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Imagen final optimizada
FROM nginx:alpine

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos del frontend (excluir node_modules y archivos innecesarios)
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY image/ /usr/share/nginx/html/image/

# Copiar archivos de configuración necesarios
COPY robots.txt /usr/share/nginx/html/ 2>/dev/null || echo "robots.txt not found, skipping..."

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Configurar permisos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Cambiar al usuario no-root
USER nginx

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Exponer puerto
EXPOSE 80

# Labels para metadatos
LABEL maintainer="Andres Aroca <Arthurandres30@gmail.com>"
LABEL description="Portafolio personal - Frontend optimizado con nginx"
LABEL version="1.0"

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]