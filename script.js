document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    const nav = document.querySelector('nav');
    const navOffset = nav.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        nav.sticky {
            position: fixed;
            top: 0;
            width: 100%;
            animation: fadeInDown 0.5s;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    alert('Mensagem enviada com sucesso!');
                    this.reset();
                } else {
                    alert('Ocorreu um erro ao enviar a mensagem.');
                }
            })
            .catch(error => {
                alert('Ocorreu um erro ao enviar a mensagem.');
                console.error(error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }
    
    // Menu Hamburguer - só adiciona se for mobile
    const navList = document.querySelector('nav ul');
    
    // Verificar se é dispositivo móvel e adicionar o botão do menu
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('nav').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            // Força o redesenho da animação
            if (navList.classList.contains('active')) {
                navList.style.animation = 'slideUp 0.3s ease forwards';
                setTimeout(() => {
                    navList.classList.remove('active');
                }, 280); // Um pouco menor que a duração da animação
            } else {
                navList.classList.add('active');
                navList.style.animation = 'slideDown 0.3s ease forwards';
            }
            
            // Anima o ícone
            menuToggle.classList.toggle('active');
            
            // Troca o ícone com animação
            const icon = menuToggle.querySelector('i');
            if (menuToggle.classList.contains('active')) {
                setTimeout(() => {
                    icon.classList.replace('fa-bars', 'fa-times');
                }, 150);
            } else {
                setTimeout(() => {
                    icon.classList.replace('fa-times', 'fa-bars');
                }, 150);
            }
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navList.style.animation = 'slideUp 0.3s ease forwards';
                    setTimeout(() => {
                        navList.classList.remove('active');
                        menuToggle.classList.remove('active');
                        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                    }, 280);
                }
            });
        });
    }
});