# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

## Descripción del Proyecto

Este es un sitio web de portafolio personal para Andres Aroca, construido como una aplicación de página única usando HTML, CSS y JavaScript vanilla con backend Node.js. El portafolio muestra información personal, habilidades técnicas, certificaciones y formulario de contacto funcional con un diseño moderno, responsivo y multiidioma.

## Arquitectura

- **Frontend**: Aplicación de página única con navegación basada en secciones
- **Backend**: API REST con Node.js/Express para formulario de contacto
- **JavaScript vanilla** para todas las interacciones (sin frameworks)
- **Sistema multiidioma** (español/inglés) con persistencia local
- **Propiedades personalizadas CSS** para tematización y modo oscuro/claro
- **CSS modular** con archivos separados para estilos principales, temas de color y selector de estilos

### Estructura de Archivos
```
├── index.html                  # Archivo HTML principal con todas las secciones
├── server.js                   # Servidor backend Node.js/Express
├── package.json                # Dependencias y scripts del backend
├── .env.example               # Template de configuración del backend
├── .gitignore                 # Archivos a ignorar en Git
├── README_BACKEND.md          # Documentación del backend
├── css/
│   ├── style.css              # Estilos principales y diseño
│   ├── style-switcher.css     # Estilos del componente selector de estilos
│   └── skins/                 # Variaciones de temas de color
│       ├── color-1.css        # Tema por defecto
│       ├── color-2.css        # Temas alternativos
│       └── ...
├── js/
│   ├── script.js              # Navegación, formulario y funcionalidad principal
│   ├── style-switcher.js      # Funcionalidad de cambio de temas
│   ├── translations.js        # Diccionario de traducciones ES/EN
│   └── language-switcher.js   # Sistema de cambio de idioma
├── image/                     # Imágenes optimizadas de perfil y certificados
│   ├── profile.jpg            # Foto de perfil optimizada (626KB)
│   └── certificates/          # Certificados organizados por tecnología
│       ├── aws/               # Certificados de AWS (4 archivos, 540KB)
│       ├── docker-kubernetes/ # Certificados de containerización (76KB)
│       └── terraform/         # Certificados de IaC (144KB)
└── Dockerfile                 # Para despliegue containerizado con nginx
```

## Características Principales

### Sistema de Navegación
- Navegación de página única usando enrutamiento basado en hash
- Resaltado de sección activa con clase `.active`
- Navegación lateral responsiva con toggle para móvil
- Transiciones suaves entre secciones con clases CSS (`.back-section`, `.active`)

### Sistema de Temas
- **Toggle modo oscuro/claro** controlado por clase `.dark` en body
- **Variaciones de esquemas de color** via propiedades personalizadas CSS en `/css/skins/`
- **Panel selector de estilos** para cambios de tema en tiempo real
- Todos los temas usan propiedades personalizadas CSS definidas en `:root` y `body.dark`

### Sistema Multiidioma
- **Modal de selección independiente** - Botón de idioma (🌐) que abre modal dedicado
- **Cambio dinámico** entre español e inglés sin recargar página
- **Persistencia** del idioma seleccionado en localStorage
- **Traducción completa** de toda la interfaz y contenido
- **Validaciones del formulario** traducidas en tiempo real
- **Modales de certificaciones** con traducciones dinámicas en tiempo real
- **Botones con banderas** (🇪🇸 Español / 🇺🇸 English) en modal dedicado

### Sección de Certificaciones Interactiva
- **Cards clicables** con iconos de tecnologías (Java, JavaScript, Spring Boot, AWS, Docker, etc.)
- **Modales informativos** con descripciones detalladas completamente traducidas
- **Traducciones dinámicas** - Los modales muestran textos en el idioma actual automáticamente
- **Preparado para mostrar certificados** - estructura lista para imágenes
- **Efectos hover** y transiciones suaves
- **Sistema de datos separado** - Iconos/imágenes estáticos + textos desde translations.js

### Formulario de Contacto Funcional
- **Backend completo** con Node.js/Express y Nodemailer
- **Envío real de emails** a través de Gmail SMTP
- **Validaciones robustas** tanto frontend como backend
- **Rate limiting** de seguridad (5 emails/hora por IP)
- **Estados de loading** y manejo de errores
- **Templates HTML profesionales** para emails enviados

### Animación de Tipografía
- Usa la librería Typed.js para efectos de texto animado
- **Se actualiza automáticamente** al cambiar idioma
- Configurado dinámicamente desde `language-switcher.js`

## Desarrollo

### Desarrollo Local

#### Frontend (estático)
```bash
# Servir localmente (usar cualquier servidor de archivos estáticos)
python -m http.server 8000
# o
npx serve .
```

#### Backend (para formulario de contacto)
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales de Gmail

# Desarrollo con auto-reload
npm run dev

# Producción
npm start
```

#### Configuración de Gmail para Backend
1. Habilitar verificación en 2 pasos en Google
2. Generar contraseña de aplicación específica
3. Configurar variables en `.env`:
   - `EMAIL_USER`: tu email de Gmail
   - `EMAIL_PASS`: contraseña de aplicación generada
   - `EMAIL_TO`: email donde recibir mensajes

### Despliegue Docker
```bash
# Construir contenedor
docker build -t portfolio .

# Ejecutar contenedor
docker run -p 80:80 portfolio
```

## Convenciones de Código

- **CSS**: Usa nomenclatura tipo BEM con nombres de clase descriptivos
- **JavaScript**: Características ES6+, funciones modulares
- **HTML**: Estructura semántica con atributos de accesibilidad apropiados
- **Responsivo**: Enfoque mobile-first con breakpoint en 1200px

### Patrón de Propiedades Personalizadas CSS
```css
:root {
    --bg-black-900: #f2f2fc;  /* Valores modo claro */
    --text-black-900: #302e4d;
}

body.dark {
    --bg-black-900: #151515;  /* Valores modo oscuro */
    --text-black-900: #ffffff;
}
```

### Patrón de Navegación de Secciones
Todas las secciones usan el patrón:
- Clase `.section` para estilos base
- Clase `.active` para mostrar sección actual
- Clase `.back-section` para efectos de transición
- Enrutamiento basado en hash (`#home`, `#about`, etc.)

### Sistema de Traducciones
```javascript
// Estructura de traducciones en translations.js
const translations = {
    es: {
        nav: { home: 'Inicio', about: 'Acerca de' },
        home: { greeting: 'Hola, mi nombre es' }
    },
    en: {
        nav: { home: 'Home', about: 'About' },
        home: { greeting: 'Hello, my name is' }
    }
};
```

Elementos HTML usan `data-translate` para identificar textos:
```html
<span data-translate="nav.home">Inicio</span>
```

### API Backend
```javascript
// Endpoint principal para contacto
POST /api/contact
{
    "name": "string",
    "email": "string", 
    "subject": "string",
    "message": "string"
}
```

### Estructura de Componentes Interactivos
- **Certificaciones**: Cards con `data-tech` y `data-translate` para contenido dinámico
- **Modal de Certificaciones**: Sistema que obtiene traducciones en tiempo real del idioma actual
- **Modal de Idiomas**: Sistema independiente del panel de configuración con botones de selección
- **Formulario**: Validación client/server con mensajes traducidos
- **Style Switcher**: Panel lateral con controles de tema
- **Language Switcher**: Botón independiente que abre modal de selección de idiomas

## Funcionamiento del Sistema de Traducciones

### Arquitectura de Traducciones
```javascript
// Patrón de implementación:
1. HTML con data-translate -> Traducciones automáticas vía loadLanguage()
2. Modales dinámicos -> Traducciones en tiempo real al abrir
3. Formularios -> Funciones helper que obtienen mensajes del idioma actual
```

### Flujo de Cambio de Idioma
1. **Click en botón idioma (🌐)** → Abre modal de selección
2. **Selección de idioma** → Ejecuta changeLanguage()
3. **Actualización automática**:
   - Elementos con `data-translate` se actualizan automáticamente
   - Typed.js se reinicia con nuevo texto
   - localStorage guarda preferencia
   - Próximos modales usan nuevo idioma
4. **Modal se cierra** automáticamente

### Tecnologías con Modal Dinámico
- Java, JavaScript, Spring Boot, AWS, Docker, MySQL, Git, Kubernetes
- Cada tecnología tiene: `name`, `description`, `longDescription` en ambos idiomas
- Los modales obtienen textos de `translations[currentLang].portfolio.technologies[tech]`

## Optimización de Imágenes

### Estructura de Imágenes Actualizada (Sep 2024)
El directorio de imágenes ha sido reorganizado y expandido significativamente:

**Tamaño total actual**: 2.3MB (626KB perfil + 1.7MB certificados)
**Total de certificados**: 38 archivos organizados por tecnología

### Optimizaciones Aplicadas:
1. **Eliminación de duplicados**: Removida imagen duplicada `IMG_5646 (1).jpg`
2. **Reorganización completa**: Certificados organizados por categorías tecnológicas
3. **Renombrado**: Imagen de perfil renombrada a `profile.jpg`
4. **Lazy loading**: Implementado en imagen de perfil para mejor rendimiento
5. **Estructura categorizada**: Organización por proveedor y tipo de tecnología

### Estructura Actual:
```
image/
├── profile.jpg (626KB)           # Foto de perfil principal optimizada
└── certificates/ (1.7MB, 38 archivos) # Certificados organizados por tecnología
    ├── aws/                      # Certificados Amazon Web Services
    ├── azure/                    # Certificados Microsoft Azure
    ├── backend/                  # Certificados desarrollo backend
    ├── cloud/                    # Certificados cloud computing general
    ├── devops/                   # Certificados DevOps y automatización
    ├── docker-kubernetes/        # Certificados containerización y orquestación
    ├── frontend/                 # Certificados desarrollo frontend
    ├── google/                   # Certificados Google Cloud Platform
    ├── platzi/                   # Certificados Platzi (subdivididos)
    │   └── fundamentals/         # Certificados de fundamentos
    └── terraform/                # Certificados Infrastructure as Code
```

### Buenas Prácticas de Imágenes:
- **Mantenga la estructura organizativa**: Certificados separados por tecnología
- **Evite duplicados**: Una sola copia de cada imagen
- **Use nombres descriptivos**: Evite nombres como `IMG_5646 (1).jpg`
- **Considere WebP**: Para mejor compresión en navegadores modernos
- **Implemente lazy loading**: Para mejorar tiempo de carga inicial

### Futuras Optimizaciones Recomendadas:
- Conversión a formato WebP para navegadores modernos
- Compresión adicional de PNGs con herramientas como TinyPNG
- Lazy loading para modales de certificaciones
- Responsive images con diferentes resoluciones
- Implementación de sistema de galería para mostrar certificados por categoría
- Optimización de carga diferida para certificados no visibles inicialmente

## Estado Actual del Proyecto (Sep 2024)

### Cambios Recientes:
- ✅ **Optimización de imágenes**: Reorganización completa del directorio `/image/certificates/`
- ✅ **Expansión de certificaciones**: 38 certificados organizados en 10 categorías
- ✅ **Mejora de estructura**: Separación clara por tecnologías y proveedores
- ✅ **Sistema multiidioma robusto**: Traducciones completas ES/EN
- ✅ **Backend funcional**: Formulario de contacto con envío real de emails

### Archivos Modificados Pendientes de Commit:
- `CLAUDE.md` - Documentación actualizada
- `css/style.css` - Mejoras de estilos
- `index.html` - Actualizaciones de estructura
- `js/script.js` - Funcionalidades adicionales
- `js/translations.js` - Traducciones expandidas
- Eliminado: `image/IMG_5646 (1).jpg` (duplicado)
- Agregado: `image/profile.jpg` + 38 certificados organizados

### Próximos Pasos Recomendados:
1. **Commit de cambios actuales**: Consolidar todas las mejoras recientes
2. **Testing completo**: Verificar funcionalidad en diferentes dispositivos
3. **Optimización de rendimiento**: Implementar lazy loading para certificados
4. **SEO y accesibilidad**: Mejorar meta tags y atributos ARIA