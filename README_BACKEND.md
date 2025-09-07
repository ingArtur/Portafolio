# Backend para Formulario de Contacto

Este backend proporciona un endpoint para el formulario de contacto del portafolio, permitiendo enviar emails directamente a tu correo electrónico.

## 🚀 Características

- **API REST** simple con Express.js
- **Envío de emails** con Nodemailer
- **Validaciones** robustas de datos
- **Rate limiting** (5 emails por hora por IP)
- **CORS** configurado para múltiples dominios
- **Sanitización** de datos de entrada
- **Logging** de emails enviados
- **Manejo de errores** completo

## 📋 Prerequisitos

- Node.js (versión 16 o superior)
- Una cuenta de email para enviar correos (Gmail recomendado)

## ⚙️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

3. **Editar el archivo `.env`:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion
EMAIL_FROM=tu-email@gmail.com
EMAIL_TO=arthurandres30@gmail.com
PORT=3000
FRONTEND_URL=http://localhost:8000
```

## 🔐 Configuración de Gmail

Para usar Gmail como servidor de correo:

1. **Habilitar 2FA** en tu cuenta de Google
2. **Generar contraseña de aplicación:**
   - Ve a tu cuenta de Google
   - Seguridad → Verificación en 2 pasos
   - Contraseñas de aplicaciones
   - Genera una nueva contraseña para "Correo"
3. **Usar la contraseña generada** en `EMAIL_PASS`

## 🏃‍♂️ Uso

### Desarrollo:
```bash
npm run dev
```

### Producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints

### POST `/api/contact`
Envía un email de contacto.

**Body:**
```json
{
  "name": "Nombre del remitente",
  "email": "email@ejemplo.com", 
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te responderé pronto!"
}
```

**Respuesta de error (400/500):**
```json
{
  "success": false,
  "error": "Descripción del error"
}
```

### GET `/api/health`
Verificación de estado del servidor.

## 🛡️ Seguridad

- **Rate limiting:** 5 emails por hora por IP
- **Validación de datos:** Sanitización y validación completa
- **CORS:** Configurado para dominios específicos
- **Logs:** Registro de actividad para monitoreo

## 🌐 Despliegue

### Opciones recomendadas:
- **Heroku** (fácil y gratuito)
- **Railway** (moderno y simple)
- **DigitalOcean App Platform**
- **Vercel** (con funciones serverless)

### Variables de entorno en producción:
- Configura todas las variables del archivo `.env`
- Usa la URL real del frontend en `FRONTEND_URL`
- Considera usar un servicio de email dedicado (SendGrid, Mailgun)

## 🔧 Personalización

### Cambiar el template del email:
Edita la sección `html` en el `mailOptions` dentro de `server.js`

### Agregar más validaciones:
Modifica las funciones de validación en `server.js`

### Cambiar límite de rate limiting:
Ajusta los valores en `emailLimiter`

## 📝 Logs

Los emails enviados se registran en la consola con:
- ID del mensaje
- Información del remitente  
- Timestamp

## ❓ Troubleshooting

### Error de autenticación con Gmail:
- Verifica que tengas 2FA habilitado
- Usa una contraseña de aplicación, no tu contraseña normal
- Verifica que `EMAIL_USER` y `EMAIL_FROM` sean el mismo

### CORS errors:
- Agrega tu dominio frontend a la configuración CORS
- Verifica que `FRONTEND_URL` esté configurado correctamente

### Rate limiting:
- Cada IP puede enviar máximo 5 emails por hora
- Para testing, reinicia el servidor para resetear el contador