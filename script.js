document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    const logo = document.getElementById('logo');
    const menuLinks = document.querySelectorAll('.menu-link');
    const pages = document.querySelectorAll('.page');
    const footer = document.querySelector('.footer');
    
    const aboutTitle = document.getElementById('about-title');
    const contactTitle = document.getElementById('contact-title');
    
    const pageContents = {
        about: "关于我",
        contact: "联系我"
    };

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.page);
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    logo.addEventListener('click', () => showPage('home'));

    function showPage(pageId) {
        pages.forEach(page => {
            const isActive = page.id === pageId;
            page.classList.toggle('active', isActive);
            
            if (isActive) {
                if (pageId === 'about') typeEffect(aboutTitle, pageContents.about);
                if (pageId === 'contact') typeEffect(contactTitle, pageContents.contact);
                
                if (pageId === 'home') {
                    footer.style.display = 'block';
                } else {
                    footer.style.display = 'none';
                }
            }
        });
    }

    function typeEffect(element, text, i = 0) {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            setTimeout(() => typeEffect(element, text, i + 1), 100);
        }
    }

    function adjustButtonWidths() {
        const buttons = document.querySelectorAll('.btn');
        let maxWidth = 0;
        
        buttons.forEach(btn => {
            btn.style.width = 'auto';
        });
        
        buttons.forEach(btn => {
            const btnWidth = btn.offsetWidth;
            if (btnWidth > maxWidth) {
                maxWidth = btnWidth;
            }
        });
        
        buttons.forEach(btn => {
            btn.style.width = maxWidth + 'px';
        });
        
        document.documentElement.style.setProperty('--btn-width', maxWidth + 'px');
    }

    aboutTitle.textContent = '';
    contactTitle.textContent = '';
    
    window.addEventListener('load', adjustButtonWidths);
    window.addEventListener('resize', adjustButtonWidths);
});