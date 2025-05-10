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
});