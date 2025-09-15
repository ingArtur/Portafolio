#!/usr/bin/env node

/**
 * Script de validación para verificar que el proyecto esté listo para producción
 * Ejecutar con: node validate-production.js
 */

const fs = require('fs');
const path = require('path');

const CHECKS = {
    passed: 0,
    failed: 0,
    warnings: 0
};

function log(type, message) {
    const symbols = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    console.log(`${symbols[type]} ${message}`);
}

function checkFile(filePath, required = true) {
    if (fs.existsSync(filePath)) {
        CHECKS.passed++;
        log('success', `Archivo encontrado: ${filePath}`);
        return true;
    } else {
        if (required) {
            CHECKS.failed++;
            log('error', `Archivo requerido faltante: ${filePath}`);
        } else {
            CHECKS.warnings++;
            log('warning', `Archivo opcional faltante: ${filePath}`);
        }
        return false;
    }
}

function checkFileContent(filePath, patterns, description) {
    if (!fs.existsSync(filePath)) {
        CHECKS.failed++;
        log('error', `No se puede verificar ${description}: ${filePath} no existe`);
        return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    let allPassed = true;

    patterns.forEach(pattern => {
        if (content.includes(pattern.text)) {
            CHECKS.passed++;
            log('success', `${description}: ${pattern.description}`);
        } else {
            CHECKS.failed++;
            log('error', `${description}: Falta ${pattern.description}`);
            allPassed = false;
        }
    });

    return allPassed;
}

console.log('\n🔍 VALIDANDO PROYECTO PARA PRODUCCIÓN\n');

// 1. Verificar archivos críticos
log('info', '1. Verificando archivos críticos...');
checkFile('index.html');
checkFile('js/config.js');
checkFile('js/script.js');
checkFile('server.js');
checkFile('nginx.conf');
checkFile('Dockerfile');
checkFile('.dockerignore');
checkFile('.env.example');
checkFile('package.json');

// 2. Verificar archivos de SEO
log('info', '\n2. Verificando archivos de SEO...');
checkFile('robots.txt');
checkFile('sitemap.xml');

// 3. Verificar archivos de documentación
log('info', '\n3. Verificando documentación...');
checkFile('CLAUDE.md');
checkFile('DEPLOYMENT.md');
checkFile('README_BACKEND.md', false);

// 4. Verificar configuración de seguridad en server.js
log('info', '\n4. Verificando configuración de seguridad...');
checkFileContent('server.js', [
    { text: 'X-Content-Type-Options', description: 'Header X-Content-Type-Options' },
    { text: 'X-Frame-Options', description: 'Header X-Frame-Options' },
    { text: 'Content-Security-Policy', description: 'Header CSP' },
    { text: 'process.env.CORS_ORIGINS', description: 'CORS dinámico' }
], 'Seguridad del backend');

// 5. Verificar SEO en HTML
log('info', '\n5. Verificando SEO en HTML...');
checkFileContent('index.html', [
    { text: 'meta name="description"', description: 'Meta description' },
    { text: 'meta name="keywords"', description: 'Meta keywords' },
    { text: 'property="og:title"', description: 'Open Graph title' },
    { text: 'property="og:image"', description: 'Open Graph image' },
    { text: 'link rel="canonical"', description: 'Canonical URL' }
], 'SEO del frontend');

// 6. Verificar configuración dinámica
log('info', '\n6. Verificando configuración dinámica...');
checkFileContent('js/script.js', [
    { text: 'window.AppConfig', description: 'Uso de configuración dinámica' }
], 'Configuración del frontend');

// 7. Verificar estructura de imágenes
log('info', '\n7. Verificando estructura de imágenes...');
checkFile('image/profile.jpg');
checkFile('image/certificates', false);

// 8. Verificar que no haya archivos problemáticos
log('info', '\n8. Verificando ausencia de archivos problemáticos...');
if (fs.existsSync('image/IMG_5646 (1).jpg')) {
    CHECKS.failed++;
    log('error', 'Archivo duplicado encontrado: image/IMG_5646 (1).jpg');
} else {
    CHECKS.passed++;
    log('success', 'No se encontraron archivos duplicados de imágenes');
}

// 9. Verificar estructura de directorios
log('info', '\n9. Verificando estructura de directorios...');
const requiredDirs = ['css', 'js', 'image'];
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        CHECKS.passed++;
        log('success', `Directorio encontrado: ${dir}/`);
    } else {
        CHECKS.failed++;
        log('error', `Directorio faltante: ${dir}/`);
    }
});

// 10. Verificar package.json
log('info', '\n10. Verificando package.json...');
if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredDeps = ['express', 'cors', 'nodemailer', 'express-rate-limit'];
    requiredDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
            CHECKS.passed++;
            log('success', `Dependencia encontrada: ${dep}`);
        } else {
            CHECKS.failed++;
            log('error', `Dependencia faltante: ${dep}`);
        }
    });
}

// Resumen final
console.log('\n📊 RESUMEN DE VALIDACIÓN');
console.log('========================');
console.log(`✅ Verificaciones exitosas: ${CHECKS.passed}`);
console.log(`❌ Verificaciones fallidas: ${CHECKS.failed}`);
console.log(`⚠️ Advertencias: ${CHECKS.warnings}`);

const total = CHECKS.passed + CHECKS.failed + CHECKS.warnings;
const successRate = ((CHECKS.passed / total) * 100).toFixed(1);

console.log(`\n📈 Tasa de éxito: ${successRate}%`);

if (CHECKS.failed === 0) {
    console.log('\n🎉 ¡PROYECTO LISTO PARA PRODUCCIÓN!');
    console.log('✅ Todas las verificaciones críticas pasaron exitosamente.');
    console.log('🚀 Puedes proceder con el despliegue.');
    
    if (CHECKS.warnings > 0) {
        console.log('\n⚠️ Hay algunas advertencias que puedes revisar, pero no bloquean el despliegue.');
    }
} else {
    console.log('\n🛑 PROYECTO NO LISTO PARA PRODUCCIÓN');
    console.log(`❌ ${CHECKS.failed} verificaciones críticas fallaron.`);
    console.log('🔧 Por favor, corrige los errores antes de desplegar.');
}

console.log('\n📚 Para más información, consulta DEPLOYMENT.md');

// Exit code para CI/CD
process.exit(CHECKS.failed > 0 ? 1 : 0);