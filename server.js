const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use((req, res, next) => {
    // Headers de seguridad
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // HSTS en producción
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    // CSP Header
    res.setHeader('Content-Security-Policy', 
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com; " +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
        "font-src 'self' fonts.gstatic.com; " +
        "img-src 'self' data:; " +
        "connect-src 'self';"
    );
    
    next();
});

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuración CORS dinámica
const allowedOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',')
    : [
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'https://ingartur.github.io'
    ];

app.use(cors({
    origin: allowedOrigins,
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

// Rate limiting - máximo 5 emails por hora por IP
const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 5, // máximo 5 requests por hora
    message: {
        error: 'Demasiados emails enviados desde esta IP. Intenta de nuevo en una hora.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verificar configuración del email al iniciar
transporter.verify((error, success) => {
    if (error) {
        console.error('Error en la configuración del email:', error);
    } else {
        console.log('✅ Servidor de email configurado correctamente');
    }
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para sanitizar texto
function sanitizeText(text) {
    if (typeof text !== 'string') return '';
    return text.trim().substring(0, 1000); // Limitar a 1000 caracteres
}

// Endpoint para enviar email
app.post('/api/contact', emailLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validaciones
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Todos los campos son requeridos'
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Email inválido'
            });
        }

        // Sanitizar datos
        const cleanName = sanitizeText(name);
        const cleanSubject = sanitizeText(subject);
        const cleanMessage = sanitizeText(message);

        if (cleanName.length < 2 || cleanSubject.length < 5 || cleanMessage.length < 10) {
            return res.status(400).json({
                success: false,
                error: 'Los campos deben tener una longitud mínima (nombre: 2, asunto: 5, mensaje: 10 caracteres)'
            });
        }

        // Configurar el email
        const mailOptions = {
            from: `"${cleanName}" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `[PORTAFOLIO] ${cleanSubject}`,
            text: `
Nuevo mensaje desde el portafolio:

Nombre: ${cleanName}
Email: ${email}
Asunto: ${cleanSubject}

Mensaje:
${cleanMessage}

---
Enviado desde: ${req.ip}
Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        📧 Nuevo mensaje desde tu portafolio
                    </h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #495057; margin-top: 0;">Información del contacto:</h3>
                        <p><strong>Nombre:</strong> ${cleanName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Asunto:</strong> ${cleanSubject}</p>
                    </div>
                    
                    <div style="background: white; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                        <h3 style="color: #495057; margin-top: 0;">Mensaje:</h3>
                        <p style="line-height: 1.6; color: #333;">${cleanMessage.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
                        <p><strong>IP:</strong> ${req.ip}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
                    </div>
                </div>
            `
        };

        // Enviar email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email enviado:', {
            messageId: info.messageId,
            from: cleanName,
            email: email,
            subject: cleanSubject,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            message: 'Mensaje enviado correctamente. Te responderé pronto!'
        });

    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor. Intenta de nuevo más tarde.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Manejo global de errores
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        error: 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📧 Emails se enviarán a: ${process.env.EMAIL_TO}`);
});