// Sistema de cambio de idioma
class LanguageSwitcher {
    constructor() {
        console.log('LanguageSwitcher initializing...');
        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'es';
        console.log('Current language from localStorage:', this.currentLanguage);
        this.init();
    }

    init() {
        // Cargar idioma guardado
        this.loadLanguage(this.currentLanguage);
        this.setActiveButton(this.currentLanguage);

        // Inicializar Typed.js
        this.updateTypedJS();

        // Event listeners para el botón de idioma y modal
        this.initLanguageModal();

        // Event listeners para botones de idioma
        const langButtons = document.querySelectorAll('.lang-btn');
        console.log('Found language buttons:', langButtons.length);
        
        langButtons.forEach(btn => {
            console.log('Adding event listener to button:', btn.getAttribute('data-lang'));
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                console.log('Language button clicked:', lang);
                this.changeLanguage(lang);
                this.closeLanguageModal();
            });
        });
    }

    initLanguageModal() {
        const languageBtn = document.querySelector('.language-switcher');
        const languageModal = document.querySelector('.language-modal');
        
        if (languageBtn && languageModal) {
            // Abrir modal al hacer click en el botón de idioma
            languageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Language button clicked - opening modal');
                this.openLanguageModal();
            });

            // Cerrar modal al hacer click fuera de él
            languageModal.addEventListener('click', (e) => {
                if (e.target === languageModal) {
                    this.closeLanguageModal();
                }
            });

            // Cerrar modal con tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && languageModal.classList.contains('show')) {
                    this.closeLanguageModal();
                }
            });
        }
    }

    openLanguageModal() {
        const languageModal = document.querySelector('.language-modal');
        if (languageModal) {
            languageModal.classList.add('show');
            console.log('Language modal opened');
        }
    }

    closeLanguageModal() {
        const languageModal = document.querySelector('.language-modal');
        if (languageModal) {
            languageModal.classList.remove('show');
            console.log('Language modal closed');
        }
    }

    changeLanguage(language) {
        console.log('Changing language to:', language, 'Current:', this.currentLanguage);
        
        if (language === this.currentLanguage) {
            console.log('Language is already selected');
            return;
        }
        
        this.currentLanguage = language;
        localStorage.setItem('preferredLanguage', language);
        
        console.log('Loading language:', language);
        this.loadLanguage(language);
        this.setActiveButton(language);
        
        // Actualizar Typed.js con el nuevo idioma
        this.updateTypedJS();
        
        console.log('Language changed successfully');
    }

    loadLanguage(language) {
        const texts = translations[language];
        
        // Actualizar elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getNestedProperty(texts, key);
            
            if (translation) {
                element.textContent = translation;
            }
        });

        // Actualizar placeholders del formulario
        if (texts.contact && texts.contact.form && texts.contact.form.placeholders) {
            const placeholders = texts.contact.form.placeholders;
            
            document.getElementById('name')?.setAttribute('placeholder', placeholders.name);
            document.getElementById('email')?.setAttribute('placeholder', placeholders.email);
            document.getElementById('subject')?.setAttribute('placeholder', placeholders.subject);
            document.getElementById('message')?.setAttribute('placeholder', placeholders.message);
        }

        // Actualizar botón del formulario
        if (texts.contact && texts.contact.form) {
            const submitBtn = document.querySelector('.btn-text');
            if (submitBtn) {
                submitBtn.textContent = texts.contact.form.button;
            }
        }

        // Actualizar información de contacto
        this.updateContactInfo(texts);

        // Actualizar información personal
        this.updatePersonalInfo(texts);

        // Actualizar educación y experiencia
        this.updateEducationExperience(texts);

        // Actualizar certificaciones
        this.updateCertifications(texts);
    }

    updateContactInfo(texts) {
        const contactInfo = texts.contact?.info;
        if (!contactInfo) return;

        // Actualizar títulos de información de contacto
        const contactItems = document.querySelectorAll('.contact-info-item');
        if (contactItems.length >= 3) {
            // Teléfono
            const phoneTitle = contactItems[0]?.querySelector('h4');
            if (phoneTitle) phoneTitle.textContent = contactInfo.phone.title;

            // Oficina
            const officeTitle = contactItems[1]?.querySelector('h4');
            if (officeTitle) officeTitle.textContent = contactInfo.office.title;

            // Email
            const emailTitle = contactItems[2]?.querySelector('h4');
            if (emailTitle) emailTitle.textContent = contactInfo.email.title;

            // Website (si existe el 4to elemento)
            if (contactItems[3]) {
                const websiteTitle = contactItems[3]?.querySelector('h4');
                if (websiteTitle) websiteTitle.textContent = contactInfo.website?.title || contactInfo.email.title;
            }
        }

        // Actualizar títulos de la sección
        const contactTitle = document.querySelector('.contact-title');
        if (contactTitle) contactTitle.textContent = texts.contact.form.title;

        const contactSubTitle = document.querySelector('.contact-sub-title');
        if (contactSubTitle) contactSubTitle.textContent = texts.contact.form.subtitle;
    }

    updatePersonalInfo(texts) {
        const personalInfo = texts.about?.personalInfo;
        if (!personalInfo) return;

        const infoItems = document.querySelectorAll('.info-item p');
        
        // Mapear elementos con las traducciones (sin cumpleaños, edad, email, teléfono)
        const infoMapping = [
            personalInfo.github,      // GitHub
            personalInfo.linkedin,    // LinkedIn  
            personalInfo.degree,      // Degree
            personalInfo.city,        // City
            personalInfo.freelance    // Freelance
        ];

        infoItems.forEach((item, index) => {
            if (infoMapping[index] && item.innerHTML.includes(':')) {
                const value = item.innerHTML.split('</span>')[1] || '';
                if (index === 2) { // Degree
                    item.innerHTML = `${infoMapping[index]} : <span>${personalInfo.degreeValue}</span>`;
                } else if (index === 4) { // Freelance
                    item.innerHTML = `${infoMapping[index]} : <span>${personalInfo.freelanceValue}</span>`;
                } else {
                    item.innerHTML = `${infoMapping[index]} : ${value}`;
                }
            }
        });

        // Actualizar botón "Hire Me"
        const hireMeBtn = document.querySelector('.hire-me');
        if (hireMeBtn) {
            hireMeBtn.textContent = texts.about.hireMe;
        }
    }

    updateEducationExperience(texts) {
        // Actualizar títulos de secciones
        const educationTitle = document.querySelector('.education .title');
        if (educationTitle) educationTitle.textContent = texts.about.education.title;

        const experienceTitle = document.querySelector('.experience .title');
        if (experienceTitle) experienceTitle.textContent = texts.about.experience.title;

        // Actualizar elementos de educación
        const educationItems = document.querySelectorAll('.education .timeline-item');
        educationItems.forEach((item, index) => {
            const educationData = texts.about.education.items[index];
            if (educationData) {
                const title = item.querySelector('.timeline-title');
                const institution = item.querySelector('.timeline-text');
                
                if (title) title.textContent = educationData.title;
                if (institution) institution.textContent = educationData.institution;
            }
        });

        // Actualizar elementos de experiencia
        const experienceItems = document.querySelectorAll('.experience .timeline-item');
        experienceItems.forEach((item, index) => {
            const experienceData = texts.about.experience.items[index];
            if (experienceData) {
                const title = item.querySelector('.timeline-title');
                const description = item.querySelector('.timeline-text');
                
                if (title) title.textContent = experienceData.title;
                if (description) description.textContent = experienceData.description;
            }
        });
    }

    updateCertifications(texts) {
        // Los nombres y descripciones de las certificaciones se manejan automáticamente 
        // con data-translate y el modal ahora usa traducciones dinámicas
        // Ya no necesitamos actualizar window.techInfo
    }

    updateTypedJS() {
        const texts = translations[this.currentLanguage];
        
        // Recrear Typed.js con el nuevo texto
        if (window.typed) {
            window.typed.destroy();
        }
        
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => {
            window.typed = new Typed(".typing", {
                strings: ["", texts.home.professionText],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }, 100);
    }

    setActiveButton(language) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === language);
        });
        
        // Actualizar el ícono del botón de idioma según el idioma actual
        const languageBtn = document.querySelector('.language-switcher i');
        if (languageBtn) {
            if (language === 'es') {
                languageBtn.className = 'fas fa-globe';
            } else {
                languageBtn.className = 'fas fa-globe';
            }
        }
    }

    getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});

// También inicializar si el DOM ya está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.languageSwitcher) {
            window.languageSwitcher = new LanguageSwitcher();
        }
    });
} else {
    // DOM ya está listo
    window.languageSwitcher = new LanguageSwitcher();
}

// Validaciones del formulario en el idioma actual
function getFormValidationMessages() {
    const currentLang = window.languageSwitcher?.currentLanguage || 'es';
    return translations[currentLang]?.contact?.form?.validation || translations.es.contact.form.validation;
}

function getFormMessages() {
    const currentLang = window.languageSwitcher?.currentLanguage || 'es';
    return translations[currentLang]?.contact?.form || translations.es.contact.form;
}