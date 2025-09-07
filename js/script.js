var typed = new Typed(".typing", {
    strings:["", "Web Developer", "Backend Developer"],
    typeSpeed: 100,
    Backspeed:60,
    loop:true
})

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

    const techInfo = {
        java: {
            title: 'Java',
            description: 'Java es un lenguaje de programación orientado a objetos y una plataforma informática. Es robusto, seguro y portable. He desarrollado aplicaciones backend usando Spring Boot, implementando arquitecturas MVC y APIs REST.',
            cert: 'image/cert-java.jpg',
            icon: 'fab fa-java'
        },
        javascript: {
            title: 'JavaScript',
            description: 'JavaScript es un lenguaje de programación dinámico que permite crear contenido web interactivo. Lo uso para desarrollo frontend y backend (Node.js), manipulación del DOM y desarrollo de aplicaciones web modernas.',
            cert: 'image/cert-js.jpg',
            icon: 'fab fa-js-square'
        },
        spring: {
            title: 'Spring Boot',
            description: 'Spring Boot es un framework de Java que facilita la creación de aplicaciones web y microservicios. Lo utilizo para desarrollar APIs REST robustas, gestionar dependencias y implementar patrones de diseño.',
            cert: 'image/cert-spring.jpg',
            icon: 'fas fa-leaf'
        },
        aws: {
            title: 'Amazon Web Services',
            description: 'AWS es una plataforma de servicios de nube que ofrece computación, almacenamiento y bases de datos. Tengo experiencia en EC2, S3, RDS y Lambda para desplegar aplicaciones escalables en la nube.',
            cert: 'image/cert-aws.jpg',
            icon: 'fab fa-aws'
        },
        docker: {
            title: 'Docker',
            description: 'Docker es una plataforma de containerización que permite empaquetar aplicaciones y sus dependencias. Lo uso para crear entornos consistentes, facilitar deployments y mejorar la escalabilidad de aplicaciones.',
            cert: 'image/cert-docker.jpg',
            icon: 'fab fa-docker'
        },
        mysql: {
            title: 'MySQL',
            description: 'MySQL es un sistema de gestión de bases de datos relacionales. Tengo experiencia diseñando esquemas, optimizando consultas, implementando relaciones y asegurando la integridad de los datos.',
            cert: 'image/cert-mysql.jpg',
            icon: 'fas fa-database'
        },
        git: {
            title: 'Git',
            description: 'Git es un sistema de control de versiones distribuido. Lo uso diariamente para gestionar código, colaborar en equipo, manejar branches, realizar merges y mantener historiales de cambios.',
            cert: 'image/cert-git.jpg',
            icon: 'fab fa-git-alt'
        },
        kubernetes: {
            title: 'Kubernetes',
            description: 'Kubernetes es una plataforma de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones containerizadas. Lo uso para gestionar microservicios en producción.',
            cert: 'image/cert-k8s.jpg',
            icon: 'fas fa-cubes'
        }
    };

    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const tech = this.getAttribute('data-tech');
            const info = techInfo[tech];
            
            document.getElementById('modalIcon').className = info.icon;
            document.getElementById('modalTitle').textContent = info.title;
            document.getElementById('modalDescription').textContent = info.description;
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
