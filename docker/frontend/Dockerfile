# Dockerfile para Frontend - Servidor estático con nginx
FROM nginx:alpine

# Copiar archivos del frontend
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY image/ /usr/share/nginx/html/image/

# Eliminar todas las configuraciones por defecto
RUN rm -rf /etc/nginx/conf.d/*
RUN rm -f /etc/nginx/nginx.conf

# Copiar configuración personalizada
COPY docker/frontend/nginx.conf /etc/nginx/nginx.conf

# Configuración nginx lista

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]