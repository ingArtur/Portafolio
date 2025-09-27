# Guía de Despliegue Docker - 3 Contenedores Separados

Esta guía te permitirá desplegar tu portafolio usando 3 contenedores Docker independientes sin docker-compose.

## Arquitectura

- **Contenedor 1**: Frontend (nginx) - Puerto 3000
- **Contenedor 2**: Backend (Node.js) - Puerto 3001
- **Contenedor 3**: Base de Datos (PostgreSQL) - Puerto 5432

## Prerequisitos

- Docker instalado
- Puertos 3000, 3001 y 5432 disponibles

## Paso 1: Preparar Archivos Docker

### 1.1 Crear estructura de directorios
```bash
mkdir docker
mkdir docker/frontend
mkdir docker/backend
mkdir docker/database
```

### 1.2 Dockerfile para Frontend
Crear `docker/frontend/Dockerfile`:
```dockerfile
FROM nginx:alpine

# Copiar archivos del frontend
COPY ../../index.html /usr/share/nginx/html/
COPY ../../css/ /usr/share/nginx/html/css/
COPY ../../js/ /usr/share/nginx/html/js/
COPY ../../image/ /usr/share/nginx/html/image/

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 1.3 Configuración nginx para Frontend
Crear `docker/frontend/nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Configuración para SPA
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Proxy para API del backend
        location /api/ {
            proxy_pass http://host.docker.internal:3001/api/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

### 1.4 Dockerfile para Backend
Crear `docker/backend/Dockerfile`:
```dockerfile
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
```

### 1.5 Variables de entorno para Backend
Crear `docker/backend/.env`:
```env
PORT=3001
DB_HOST=host.docker.internal
DB_PORT=5432
DB_NAME=portfolio_db
DB_USER=portfolio_user
DB_PASS=portfolio_password
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_aplicacion
EMAIL_TO=destino@email.com
NODE_ENV=production
```

## Paso 2: Crear Red Docker

```bash
# Crear red personalizada para comunicación entre contenedores
docker network create portfolio-network
```

## Paso 3: Desplegar Base de Datos

```bash
# Ejecutar contenedor PostgreSQL
docker run -d \
  --name portfolio-database \
  --network portfolio-network \
  -e POSTGRES_DB=portfolio_db \
  -e POSTGRES_USER=portfolio_user \
  -e POSTGRES_PASSWORD=portfolio_password \
  -p 5432:5432 \
  -v portfolio-db-data:/var/lib/postgresql/data \
  postgres:15-alpine

# Verificar que esté funcionando
docker logs portfolio-database
```

## Paso 4: Construir y Desplegar Backend

```bash
# Construir imagen del backend
cd docker/backend
docker build -t portfolio-backend .

# Ejecutar contenedor del backend
docker run -d \
  --name portfolio-backend \
  --network portfolio-network \
  --env-file .env \
  -p 3001:3001 \
  portfolio-backend

# Verificar logs
docker logs portfolio-backend
```

## Paso 5: Construir y Desplegar Frontend

```bash
# Construir imagen del frontend
cd ../frontend
docker build -t portfolio-frontend .

# Ejecutar contenedor del frontend
docker run -d \
  --name portfolio-frontend \
  --network portfolio-network \
  -p 3000:80 \
  portfolio-frontend

# Verificar logs
docker logs portfolio-frontend
```

## Paso 6: Verificar Despliegue

### 6.1 Verificar contenedores activos
```bash
docker ps
```

Deberías ver 3 contenedores corriendo:
- portfolio-frontend (puerto 3000)
- portfolio-backend (puerto 3001)
- portfolio-database (puerto 5432)

### 6.2 Probar la aplicación
- Frontend: http://localhost:3000
- API Backend: http://localhost:3001/api/contact (POST)
- Base de datos: localhost:5432

## Scripts de Gestión

### Iniciar todos los contenedores
```bash
#!/bin/bash
# start-all.sh

echo "Iniciando base de datos..."
docker start portfolio-database

echo "Esperando que la base de datos esté lista..."
sleep 10

echo "Iniciando backend..."
docker start portfolio-backend

echo "Esperando que el backend esté listo..."
sleep 5

echo "Iniciando frontend..."
docker start portfolio-frontend

echo "Aplicación disponible en http://localhost:3000"
```

### Detener todos los contenedores
```bash
#!/bin/bash
# stop-all.sh

echo "Deteniendo frontend..."
docker stop portfolio-frontend

echo "Deteniendo backend..."
docker stop portfolio-backend

echo "Deteniendo base de datos..."
docker stop portfolio-database

echo "Todos los contenedores detenidos"
```

### Ver logs de todos los contenedores
```bash
#!/bin/bash
# logs-all.sh

echo "=== LOGS FRONTEND ==="
docker logs --tail=20 portfolio-frontend

echo -e "\n=== LOGS BACKEND ==="
docker logs --tail=20 portfolio-backend

echo -e "\n=== LOGS DATABASE ==="
docker logs --tail=20 portfolio-database
```

## Comandos Útiles

### Gestión de contenedores
```bash
# Ver contenedores corriendo
docker ps

# Ver todos los contenedores
docker ps -a

# Reiniciar un contenedor específico
docker restart portfolio-frontend

# Ver logs en tiempo real
docker logs -f portfolio-backend

# Ejecutar comando dentro del contenedor
docker exec -it portfolio-database psql -U portfolio_user -d portfolio_db
```

### Limpieza
```bash
# Detener y eliminar todos los contenedores
docker stop portfolio-frontend portfolio-backend portfolio-database
docker rm portfolio-frontend portfolio-backend portfolio-database

# Eliminar imágenes
docker rmi portfolio-frontend portfolio-backend

# Eliminar red
docker network rm portfolio-network

# Eliminar volumen de base de datos (¡CUIDADO! Esto borra los datos)
docker volume rm portfolio-db-data
```

## Actualizar la Aplicación

### Frontend
```bash
docker stop portfolio-frontend
docker rm portfolio-frontend
cd docker/frontend
docker build -t portfolio-frontend .
docker run -d --name portfolio-frontend --network portfolio-network -p 3000:80 portfolio-frontend
```

### Backend
```bash
docker stop portfolio-backend
docker rm portfolio-backend
cd docker/backend
docker build -t portfolio-backend .
docker run -d --name portfolio-backend --network portfolio-network --env-file .env -p 3001:3001 portfolio-backend
```

## Solución de Problemas

### El frontend no puede conectar con el backend
- Verificar que ambos contenedores estén en la misma red
- Comprobar la configuración de nginx para el proxy

### El backend no puede conectar con la base de datos
- Verificar las variables de entorno
- Asegurarse de que la base de datos esté corriendo
- Comprobar los logs: `docker logs portfolio-database`

### Puertos ocupados
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# En Linux/Mac
lsof -i :3000
```

### Verificar conectividad entre contenedores
```bash
# Probar desde el backend hacia la base de datos
docker exec -it portfolio-backend ping portfolio-database

# Probar conexión HTTP
docker exec -it portfolio-frontend curl http://portfolio-backend:3001/api/health
```

## Monitoreo

### Ver recursos utilizados
```bash
docker stats portfolio-frontend portfolio-backend portfolio-database
```

### Backup de base de datos
```bash
docker exec portfolio-database pg_dump -U portfolio_user portfolio_db > backup_$(date +%Y%m%d).sql
```

### Restaurar base de datos
```bash
docker exec -i portfolio-database psql -U portfolio_user portfolio_db < backup.sql
```

---

## Notas Importantes

1. **Seguridad**: Cambia las contraseñas por defecto antes de usar en producción
2. **Persistencia**: Los datos de la base de datos se guardan en el volumen `portfolio-db-data`
3. **Networking**: Usa `host.docker.internal` para comunicación con el host desde contenedores
4. **Logs**: Revisa regularmente los logs para detectar errores
5. **Actualizaciones**: Reconstruye las imágenes cuando modifiques el código

¡Tu aplicación estará disponible en http://localhost:3000!