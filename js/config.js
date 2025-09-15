// Configuración de entorno para el portafolio
const config = {
    // Detectar entorno automáticamente
    ENVIRONMENT: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'development' 
        : 'production',
    
    // URLs dinámicas según entorno
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : window.location.hostname.includes('github.io')
            ? 'https://tu-backend-heroku.herokuapp.com/api' // Cambiar cuando tengas backend
            : `${window.location.origin}/api`,
    
    // Configuraciones de API
    REQUEST_TIMEOUT: 10000, // 10 segundos
    RETRY_ATTEMPTS: 3,
    
    // Configuraciones de UI
    TYPED_SPEED: 70,
    MODAL_ANIMATION_DURATION: 300,
    
    // Configuraciones de validación
    MIN_NAME_LENGTH: 2,
    MIN_SUBJECT_LENGTH: 5,
    MIN_MESSAGE_LENGTH: 10,
    
    // URLs de redes sociales (centralizadas)
    SOCIAL_LINKS: {
        github: 'https://github.com/ingArtur',
        linkedin: 'https://www.linkedin.com/in/artur-andres-aroca-yara-565363272/'
    }
};

// Exportar configuración para uso global
window.AppConfig = config;

// Log de configuración en desarrollo
if (config.ENVIRONMENT === 'development') {
    console.log('🚀 Portfolio Config:', config);
    console.log('📡 API URL:', config.API_BASE_URL);
}