# 🚀 GUÍA DE DESPLIEGUE - PORTAFOLIO ANDRES AROCA

## 📋 PREPARACIÓN PREVIA

### Requisitos del Sistema
- **Docker**: 20.10+
- **Docker Compose**: 1.29+
- **Node.js**: 18+ (solo para desarrollo)
- **Git**: 2.30+

### Variables de Entorno Obligatorias
```bash
# Copiar y configurar variables
cp .env.example .env

# Configurar al menos estas variables críticas:
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion-google
CORS_ORIGINS=https://tu-dominio.com
NODE_ENV=production
```

---

## 🐳 DESPLIEGUE CON DOCKER (RECOMENDADO)

### Opción 1: Solo Frontend (Nginx)
```bash
# 1. Clonar repositorio
git clone https://github.com/ingArtur/Portafolio.git
cd Portafolio

# 2. Construir imagen
docker build -t portafolio-frontend .

# 3. Ejecutar contenedor
docker run -d \
  --name portafolio \
  -p 80:80 \
  --restart unless-stopped \
  portafolio-frontend

# 4. Verificar
curl http://localhost/health
```

### Opción 2: Frontend + Backend con Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
      - CORS_ORIGINS=${CORS_ORIGINS}
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  app_data:
```

```bash
# Ejecutar con compose
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

---

## ☁️ DESPLIEGUE EN CLOUD

### GitHub Pages (Solo Frontend)
```bash
# 1. Push a main branch
git push origin main

# 2. Ir a Settings > Pages en GitHub
# 3. Seleccionar "Deploy from a branch" > main
# 4. El sitio estará en: https://ingartur.github.io/Portafolio/
```

### Netlify (Frontend)
```bash
# 1. Conectar repositorio en netlify.com
# 2. Build settings:
#    - Build command: (vacío, es estático)
#    - Publish directory: .
# 3. Environment variables: (ninguna necesaria para frontend)
```

### Heroku (Fullstack)
```bash
# 1. Crear Dockerfile.heroku
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE $PORT
CMD ["node", "server.js"]

# 2. Configurar en Heroku
heroku create tu-app-name
heroku config:set NODE_ENV=production
heroku config:set EMAIL_USER=tu-email@gmail.com
heroku config:set EMAIL_PASS=tu-contraseña

# 3. Desplegar
git push heroku main
```

### AWS (Producción)
```bash
# 1. Frontend en S3 + CloudFront
aws s3 sync . s3://tu-bucket-name --exclude "server.js" --exclude "node_modules/*"

# 2. Backend en ECS/Lambda
# Ver documentación específica de AWS
```

---

## 🔧 CONFIGURACIÓN POR ENTORNO

### Desarrollo Local
```bash
# Frontend
python -m http.server 8000
# o
npx serve .

# Backend
npm install
npm run dev
```

### Staging
```bash
# Variables específicas de staging
NODE_ENV=staging
CORS_ORIGINS=https://staging.tu-dominio.com
LOG_LEVEL=debug
```

### Producción
```bash
# Variables críticas de producción
NODE_ENV=production
CORS_ORIGINS=https://tu-dominio.com,https://www.tu-dominio.com
ENABLE_SECURITY_HEADERS=true
LOG_LEVEL=warn
```

---

## 🔍 VERIFICACIÓN POST-DESPLIEGUE

### Tests de Funcionamiento
```bash
# 1. Health check
curl https://tu-dominio.com/health

# 2. Test del frontend
curl -I https://tu-dominio.com/
# Debe retornar 200 OK

# 3. Test del formulario de contacto
curl -X POST https://tu-dominio.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test message"}'

# 4. Test de headers de seguridad
curl -I https://tu-dominio.com/
# Verificar presencia de X-Frame-Options, CSP, etc.
```

### Monitoreo Básico
```bash
# Logs del contenedor
docker logs -f portafolio

# Uso de recursos
docker stats portafolio

# Procesos activos
docker exec portafolio ps aux
```

---

## 🚨 TROUBLESHOOTING

### Problemas Comunes

#### 1. Error 502 Bad Gateway
```bash
# Verificar que el backend esté ejecutándose
docker logs backend-container

# Verificar configuración de nginx
nginx -t
```

#### 2. CORS Errors
```bash
# Verificar variables de entorno
echo $CORS_ORIGINS

# Verificar configuración en server.js línea 41-54
```

#### 3. Email no se envía
```bash
# Verificar credenciales de Gmail
# 1. Verificación en 2 pasos activada
# 2. Contraseña de aplicación generada
# 3. Variables EMAIL_USER y EMAIL_PASS correctas
```

#### 4. Certificados SSL
```bash
# Para dominios personalizados, configurar Let's Encrypt
certbot --nginx -d tu-dominio.com
```

---

## 📊 MÉTRICAS Y LOGS

### Estructura de Logs
```bash
# Logs de nginx
/var/log/nginx/access.log
/var/log/nginx/error.log

# Logs de Node.js (stdout/stderr)
docker logs backend-container
```

### Métricas Importantes
- **Tiempo de respuesta**: < 2 segundos
- **Uptime**: > 99.9%
- **Tamaño de página**: < 2MB total
- **Rate limiting**: Max 5 emails/hora por IP

---

## 🔄 CI/CD (OPCIONAL)

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Build and deploy
      run: |
        docker build -t portafolio .
        # Comandos de despliegue específicos
```

---

## 📞 SOPORTE

### Contacto para Issues
- **Email**: Arthurandres30@gmail.com
- **GitHub**: https://github.com/ingArtur/Portafolio/issues

### Recursos Adicionales
- [Documentación de Docker](https://docs.docker.com/)
- [Guía de nginx](https://nginx.org/en/docs/)
- [Configuración Gmail SMTP](https://support.google.com/accounts/answer/185833)

---

## 📝 CHECKLIST PRE-PRODUCCIÓN

- [ ] Variables de entorno configuradas
- [ ] Headers de seguridad verificados
- [ ] Tests de formulario de contacto
- [ ] Certificados SSL configurados
- [ ] Backup de configuración realizado
- [ ] Monitoreo básico configurado
- [ ] DNS apuntando correctamente
- [ ] Rate limiting funcionando
- [ ] Logs configurados y accesibles

---

**Última actualización**: Septiembre 2024  
**Versión**: 1.0  
**Mantenido por**: Andres Aroca