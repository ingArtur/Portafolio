// Typed.js se inicializa desde language-switcher.js
let typed;

/*Aside */

const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0;  i<totalNavList; i++)
      {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function() {
            removeBackSection();
            for(let j=0; j<totalNavList; j++) {
                if(navList[j].querySelector("a").classList.contains("active")) 
                {
                    addBackSection(j);
                    // allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth < 1200) {
                asideSectionTogglerBtn();
            }
        })
      }
      function removeBackSection() {
        for(let i=0; i<totalSection; i++) {
            allSection[i].classList.remove("back-section");
        }
      }
      function addBackSection(num) {
        allSection[num].classList.add("back-section");
      }
      function showSection(element) {
        for(let i=0; i<totalSection; i++) {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
      }
      function updateNav (element) {
        for(let i=0; i<totalNavList; i++) {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                navList[i].querySelector("a").classList.add("active");
            }
        }
      }
      document.querySelector(".hire-me").addEventListener("click", function() {
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
      })
      const navTogglerBten = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBten.addEventListener("click", () => {
            
            asideSectionTogglerBtn();
        })
    function asideSectionTogglerBtn() {
        aside.classList.toggle("open");
        navTogglerBten.classList.toggle("open");
        for(let i=0; i<totalSection; i++) {
            allSection[i].classList.toggle("open");
        }
    }

    // Funcionalidad del modal de certificados
    const certItems = document.querySelectorAll('.cert-item');
    const modal = document.getElementById('certModal');
    const closeModal = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Datos estáticos para las certificaciones (iconos y rutas de certificados)
    const techInfo = {
        java: {
            cert: 'image/cert-java.jpg',
            icon: 'fab fa-java'
        },
        javascript: {
            cert: 'image/cert-js.jpg',
            icon: 'fab fa-js-square'
        },
        spring: {
            cert: 'image/cert-spring.jpg',
            icon: 'fas fa-leaf'
        },
        aws: {
            cert: 'image/cert-aws.jpg',
            icon: 'fab fa-aws'
        },
        docker: {
            cert: 'image/cert-docker.jpg',
            icon: 'fab fa-docker'
        },
        mysql: {
            cert: 'image/cert-mysql.jpg',
            icon: 'fas fa-database'
        },
        git: {
            cert: 'image/cert-git.jpg',
            icon: 'fab fa-git-alt'
        },
        kubernetes: {
            cert: 'image/cert-k8s.jpg',
            icon: 'fas fa-cubes'
        }
    };

    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            const info = techInfo[tech];
            
            // Obtener traducciones actuales
            const currentLang = window.languageSwitcher?.currentLanguage || 'es';
            const techTranslations = translations[currentLang]?.portfolio?.technologies?.[tech];
            
            document.getElementById('modalIcon').className = info.icon;
            document.getElementById('modalTitle').textContent = techTranslations?.name || tech.toUpperCase();
            document.getElementById('modalDescription').textContent = techTranslations?.longDescription || 'Descripción no disponible';
            document.getElementById('modalCert').src = info.cert;
            
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modal.style.display = 'none';
        }
    });

    // Funcionalidad del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Configuración del backend
    const API_BASE_URL = 'http://localhost:3000/api';

    // Función para mostrar mensajes de estado
    function showFormStatus(message, isSuccess = false) {
        formStatus.innerHTML = `
            <div class="alert ${isSuccess ? 'alert-success' : 'alert-error'}">
                <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                ${message}
            </div>
        `;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Función para limpiar errores
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
        
        const inputElements = document.querySelectorAll('.form-control');
        inputElements.forEach(el => el.classList.remove('error'));
    }

    // Función para mostrar errores específicos
    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement && inputElement) {
            errorElement.textContent = message;
            inputElement.classList.add('error');
        }
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para validar formulario
    function validateForm(formData) {
        const errors = {};
        const messages = getFormValidationMessages();

        if (!formData.name || formData.name.length < 2) {
            errors.name = messages.nameMin;
        }

        if (!formData.email) {
            errors.email = messages.emailRequired;
        } else if (!isValidEmail(formData.email)) {
            errors.email = messages.emailInvalid;
        }

        if (!formData.subject || formData.subject.length < 5) {
            errors.subject = messages.subjectMin;
        }

        if (!formData.message || formData.message.length < 10) {
            errors.message = messages.messageMin;
        }

        return errors;
    }

    // Función para cambiar estado del botón
    function setSubmitButtonState(isLoading) {
        const btnText = document.querySelector('.btn-text');
        const btnLoader = document.querySelector('.btn-loader');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    // Manejador del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        clearErrors();
        formStatus.innerHTML = '';

        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validar formulario
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(field => {
                showFieldError(field, errors[field]);
            });
            showFormStatus(getFormValidationMessages().formError);
            return;
        }

        // Enviar formulario
        setSubmitButtonState(true);

        try {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showFormStatus(result.message || getFormMessages().success, true);
                contactForm.reset();
            } else {
                showFormStatus(result.error || getFormMessages().error);
            }

        } catch (error) {
            console.error('Error:', error);
            showFormStatus(getFormMessages().connectionError);
        } finally {
            setSubmitButtonState(false);
        }
    });

    // Validación en tiempo real
    document.getElementById('name').addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 2) {
            showFieldError('name', getFormValidationMessages().nameMin);
        } else {
            document.getElementById('nameError').textContent = '';
            this.classList.remove('error');
        }
    });

    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        if (email.length > 0 && !isValidEmail(email)) {
            showFieldError('email', getFormValidationMessages().emailInvalid);
        } else {
            document.getElementById('emailError').textContent = '';
            this.classList.remove('error');
        }
    });

    document.getElementById('subject').addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 5) {
            showFieldError('subject', getFormValidationMessages().subjectMin);
        } else {
            document.getElementById('subjectError').textContent = '';
            this.classList.remove('error');
        }
    });

    document.getElementById('message').addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 10) {
            showFieldError('message', getFormValidationMessages().messageMin);
        } else {
            document.getElementById('messageError').textContent = '';
            this.classList.remove('error');
        }
    });
