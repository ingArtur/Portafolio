// Sistema de traducción inglés-español
const translations = {
    es: {
        // Navegación
        nav: {
            home: 'Inicio',
            about: 'Acerca de',
            portfolio: 'Portafolio',
            contact: 'Contacto'
        },
        
        // Sección Home
        home: {
            greeting: 'Hola, mi nombre es',
            profession: 'Soy un',
            professionText: 'Desarrollador Backend',
            description: 'Tecnólogo en desarrollo de software apasionado por el backend, la nube y la automatización. Me gusta entender problemas reales y diseñar soluciones que funcionen, escalen y evolucionen con el tiempo.',
            downloadCV: 'Descargar CV'
        },
        
        // Sección About
        about: {
            title: 'Acerca de Mí',
            subtitle: 'Soy Andres Aroca y',
            profession: 'Desarrollador Backend',
            description: 'Tecnólogo en desarrollo de software apasionado por el backend, la nube y la automatización. Trabajo con Java, JavaScript, bases de datos relacionales y no relacionales. Me he formado en herramientas modernas como AWS, Terraform, Docker y Kubernetes. Soy una persona autodidacta, curiosa y comprometida con mi crecimiento continuo.',
            personalInfo: {
                birthday: 'Cumpleaños',
                age: 'Edad',
                email: 'Email',
                degree: 'Título',
                degreeValue: 'Tecnólogo en Análisis y Desarrollo de Software',
                phone: 'Teléfono',
                city: 'Ciudad',
                freelance: 'Freelance',
                freelanceValue: 'Disponible'
            },
            hireMe: 'Contrátame',
            education: {
                title: 'Educación',
                items: [
                    {
                        date: '2022 - 2024',
                        title: 'Tecnólogo en Análisis y Desarrollo de Software',
                        institution: 'SENA | Centro de Comercio'
                    },
                    {
                        date: '2024 - 2025',
                        title: 'Desarrollador Backend Java',
                        institution: 'Oracle Next Education F2 T7 | Back-end'
                    },
                    {
                        date: '2025',
                        title: 'Amazon Web Services',
                        institution: 'Platzi'
                    }
                ]
            },
            experience: {
                title: 'Experiencia',
                items: [
                    {
                        date: '2022 - 2024',
                        title: 'Estudiante de Desarrollo de Software',
                        description: 'Formación académica en análisis y desarrollo de software en el SENA, enfocándome en fundamentos de programación y metodologías de desarrollo.'
                    },
                    {
                        date: '2024 - 2025',
                        title: 'Desarrollador Backend Java',
                        description: 'Especialización en desarrollo backend con Oracle Next Education, trabajando con Java, Spring Boot, APIs REST y arquitecturas MVC.'
                    }
                ]
            }
        },
        
        // Sección Portfolio/Certificaciones
        portfolio: {
            title: 'Certificaciones',
            subtitle: 'Mis certificaciones y tecnologías:',
            technologies: {
                java: {
                    name: 'Java',
                    description: 'Programación orientada a objetos',
                    longDescription: 'Java es un lenguaje de programación orientado a objetos y una plataforma informática. Es robusto, seguro y portable. He desarrollado aplicaciones backend usando Spring Boot, implementando arquitecturas MVC y APIs REST.'
                },
                javascript: {
                    name: 'JavaScript',
                    description: 'Desarrollo web dinámico',
                    longDescription: 'JavaScript es un lenguaje de programación dinámico que permite crear contenido web interactivo. Lo uso para desarrollo frontend y backend (Node.js), manipulación del DOM y desarrollo de aplicaciones web modernas.'
                },
                spring: {
                    name: 'Spring Boot',
                    description: 'Framework para APIs REST',
                    longDescription: 'Spring Boot es un framework de Java que facilita la creación de aplicaciones web y microservicios. Lo utilizo para desarrollar APIs REST robustas, gestionar dependencias e implementar patrones de diseño.'
                },
                aws: {
                    name: 'AWS',
                    description: 'Cloud Computing y servicios',
                    longDescription: 'AWS es una plataforma de servicios de nube que ofrece computación, almacenamiento y bases de datos. Tengo experiencia en EC2, S3, RDS y Lambda para desplegar aplicaciones escalables en la nube.'
                },
                docker: {
                    name: 'Docker',
                    description: 'Containerización de aplicaciones',
                    longDescription: 'Docker es una plataforma de containerización que permite empaquetar aplicaciones y sus dependencias. Lo uso para crear entornos consistentes, facilitar deployments y mejorar la escalabilidad de aplicaciones.'
                },
                mysql: {
                    name: 'MySQL',
                    description: 'Gestión de bases de datos',
                    longDescription: 'MySQL es un sistema de gestión de bases de datos relacionales. Tengo experiencia diseñando esquemas, optimizando consultas, implementando relaciones y asegurando la integridad de los datos.'
                },
                git: {
                    name: 'Git',
                    description: 'Control de versiones',
                    longDescription: 'Git es un sistema de control de versiones distribuido. Lo uso diariamente para gestionar código, colaborar en equipo, manejar branches, realizar merges y mantener historiales de cambios.'
                },
                kubernetes: {
                    name: 'Kubernetes',
                    description: 'Orquestación de contenedores',
                    longDescription: 'Kubernetes es una plataforma de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones containerizadas. Lo uso para gestionar microservicios en producción.'
                }
            }
        },
        
        // Sección Contact
        contact: {
            title: 'Contáctame',
            subtitle: '¿Tienes alguna pregunta?',
            subtitle2: 'ESTOY A TU SERVICIO',
            info: {
                phone: {
                    title: 'Llámanos',
                    value: '+57 3144832077'
                },
                office: {
                    title: 'Oficina',
                    value: 'Bogotá'
                },
                email: {
                    title: 'Email',
                    value: 'Arthurandres30@gmail.com'
                },
                website: {
                    title: 'Sitio Web',
                    value: 'Arthurandres30@gmail.com'
                }
            },
            form: {
                title: 'ENVÍAME UN EMAIL',
                subtitle: 'SOY MUY RECEPTIVO A MENSAJES',
                placeholders: {
                    name: 'Nombre *',
                    email: 'Email *',
                    subject: 'Asunto *',
                    message: 'Mensaje *'
                },
                button: 'Enviar Mensaje',
                buttonSending: 'Enviando...',
                validation: {
                    nameMin: 'El nombre debe tener al menos 2 caracteres',
                    emailRequired: 'El email es requerido',
                    emailInvalid: 'Por favor ingresa un email válido',
                    subjectMin: 'El asunto debe tener al menos 5 caracteres',
                    messageMin: 'El mensaje debe tener al menos 10 caracteres',
                    formError: 'Por favor corrige los errores en el formulario'
                },
                success: '¡Mensaje enviado correctamente! Te responderé pronto.',
                error: 'Error al enviar el mensaje. Intenta de nuevo.',
                connectionError: 'Error de conexión. Verifica que el servidor esté funcionando o intenta más tarde.'
            }
        }
    },
    
    en: {
        // Navigation
        nav: {
            home: 'Home',
            about: 'About',
            portfolio: 'Portfolio',
            contact: 'Contact'
        },
        
        // Home Section
        home: {
            greeting: 'Hello, my name is',
            profession: 'I\'m a',
            professionText: 'Backend Developer',
            description: 'Software development technologist passionate about backend, cloud and automation. I like to understand real problems and design solutions that work, scale and evolve over time.',
            downloadCV: 'Download CV'
        },
        
        // About Section
        about: {
            title: 'About Me',
            subtitle: 'I\'m Andres Aroca and',
            profession: 'Backend Developer',
            description: 'Software development technologist passionate about backend, cloud and automation. I work with Java, JavaScript, relational and non-relational databases. I have trained in modern tools like AWS, Terraform, Docker and Kubernetes. I am a self-taught, curious person committed to my continuous growth.',
            personalInfo: {
                birthday: 'Birthday',
                age: 'Age',
                email: 'Email',
                degree: 'Degree',
                degreeValue: 'Software Analysis and Development Technologist',
                phone: 'Phone',
                city: 'City',
                freelance: 'Freelance',
                freelanceValue: 'Available'
            },
            hireMe: 'Hire Me',
            education: {
                title: 'Education',
                items: [
                    {
                        date: '2022 - 2024',
                        title: 'Software Analysis and Development Technologist',
                        institution: 'SENA | Commerce Center'
                    },
                    {
                        date: '2024 - 2025',
                        title: 'Java Backend Developer',
                        institution: 'Oracle Next Education F2 T7 | Back-end'
                    },
                    {
                        date: '2025',
                        title: 'Amazon Web Services',
                        institution: 'Platzi'
                    }
                ]
            },
            experience: {
                title: 'Experience',
                items: [
                    {
                        date: '2022 - 2024',
                        title: 'Software Development Student',
                        description: 'Academic training in software analysis and development at SENA, focusing on programming fundamentals and development methodologies.'
                    },
                    {
                        date: '2024 - 2025',
                        title: 'Java Backend Developer',
                        description: 'Specialization in backend development with Oracle Next Education, working with Java, Spring Boot, REST APIs and MVC architectures.'
                    }
                ]
            }
        },
        
        // Portfolio/Certifications Section
        portfolio: {
            title: 'Certifications',
            subtitle: 'My certifications and technologies:',
            technologies: {
                java: {
                    name: 'Java',
                    description: 'Object-oriented programming',
                    longDescription: 'Java is an object-oriented programming language and computing platform. It is robust, secure and portable. I have developed backend applications using Spring Boot, implementing MVC architectures and REST APIs.'
                },
                javascript: {
                    name: 'JavaScript',
                    description: 'Dynamic web development',
                    longDescription: 'JavaScript is a dynamic programming language that allows creating interactive web content. I use it for frontend and backend development (Node.js), DOM manipulation and modern web application development.'
                },
                spring: {
                    name: 'Spring Boot',
                    description: 'Framework for REST APIs',
                    longDescription: 'Spring Boot is a Java framework that facilitates the creation of web applications and microservices. I use it to develop robust REST APIs, manage dependencies and implement design patterns.'
                },
                aws: {
                    name: 'AWS',
                    description: 'Cloud Computing and services',
                    longDescription: 'AWS is a cloud services platform that offers computing, storage and databases. I have experience with EC2, S3, RDS and Lambda to deploy scalable applications in the cloud.'
                },
                docker: {
                    name: 'Docker',
                    description: 'Application containerization',
                    longDescription: 'Docker is a containerization platform that allows packaging applications and their dependencies. I use it to create consistent environments, facilitate deployments and improve application scalability.'
                },
                mysql: {
                    name: 'MySQL',
                    description: 'Database management',
                    longDescription: 'MySQL is a relational database management system. I have experience designing schemas, optimizing queries, implementing relationships and ensuring data integrity.'
                },
                git: {
                    name: 'Git',
                    description: 'Version control',
                    longDescription: 'Git is a distributed version control system. I use it daily to manage code, collaborate with teams, handle branches, perform merges and maintain change histories.'
                },
                kubernetes: {
                    name: 'Kubernetes',
                    description: 'Container orchestration',
                    longDescription: 'Kubernetes is a container orchestration platform that automates deployment, scaling and management of containerized applications. I use it to manage microservices in production.'
                }
            }
        },
        
        // Contact Section
        contact: {
            title: 'Contact Me',
            subtitle: 'Have Any Questions?',
            subtitle2: 'I\'M AT YOUR SERVICES',
            info: {
                phone: {
                    title: 'Call Us On',
                    value: '+57 3144832077'
                },
                office: {
                    title: 'Office',
                    value: 'Bogotá'
                },
                email: {
                    title: 'Email',
                    value: 'Arthurandres30@gmail.com'
                },
                website: {
                    title: 'Website',
                    value: 'Arthurandres30@gmail.com'
                }
            },
            form: {
                title: 'SEND ME AN EMAIL',
                subtitle: 'I\'M VERY RESPONSIVE TO MESSAGES',
                placeholders: {
                    name: 'Name *',
                    email: 'Email *',
                    subject: 'Subject *',
                    message: 'Message *'
                },
                button: 'Send Message',
                buttonSending: 'Sending...',
                validation: {
                    nameMin: 'Name must be at least 2 characters',
                    emailRequired: 'Email is required',
                    emailInvalid: 'Please enter a valid email',
                    subjectMin: 'Subject must be at least 5 characters',
                    messageMin: 'Message must be at least 10 characters',
                    formError: 'Please correct the errors in the form'
                },
                success: 'Message sent successfully! I\'ll respond soon.',
                error: 'Error sending message. Please try again.',
                connectionError: 'Connection error. Check that the server is running or try again later.'
            }
        }
    }
};