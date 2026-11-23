document.addEventListener('DOMContentLoaded', () => {
    // 1. NÚMERO DE WHATSAPP OFICIAL BUBUU
    const WHATSAPP_NUMBER = '584124988266';

    // 2. MENÚ HAMBURGUESA RESPONSIVE
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.classList.toggle('is-active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. EFECTO EN EL HEADER AL HACER SCROLL
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    });

    // 4. ANIMACIONES DE ENTRADA AL HACER SCROLL
    const revealElements = document.querySelectorAll('.reveal');
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, 700);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. ANIMACIÓN INTERACTIVA TILT EN TARJETA DE MASCOTA
    const mascotCard = document.getElementById('mascot-card');
    if (mascotCard) {
        mascotCard.addEventListener('mousemove', (e) => {
            const rect = mascotCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
            mascotCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        mascotCard.addEventListener('mouseleave', () => {
            mascotCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // 6. CONSULTA DINÁMICA POR PRODUCTO EN WHATSAPP
    document.querySelectorAll('.inquiry-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const message = `¡Hola BUBUU! ✨🤍 Quisiera consultar disponibilidad y sabores para: *${productName}*.`;
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
        });
    });

    // =========================================================================
    // 7. CARRUSEL EDITORIAL DE 30 FOTOS (30 MENSAJES ÚNICOS SIN REPETIR)
    // =========================================================================
    const TOTAL_FOTOS = 30;
    const IMAGE_FOLDER = '';
    const IMAGE_EXT = 'jpg';

    const uniqueMoments = [
        { tag: 'Sabor Único', title: 'El sabor que conquista al primer bocado', sub: 'Balance perfecto entre dulzura y textura' },
        { tag: 'Calidad Artesanal', title: 'Hecho con dedicación de principio a fin', sub: 'Cuidamos cada detalle en nuestra cocina' },
        { tag: 'Momentos Inolvidables', title: 'Recuerdos dulces que perduran', sub: 'Ideal para celebrar lo que más importa' },
        { tag: 'Antojo del Día', title: 'Tu pausa favorita de la tarde', sub: 'Un gusto pensado para alegrarte el día' },
        { tag: 'Frescura Real', title: 'Calidad que se nota al instante', sub: 'Preparaciones frescas con todo el cariño' },
        { tag: 'Para Compartir', title: 'Momentos que se disfrutan mejor juntos', sub: 'Comparte algo especial con tu gente' },
        { tag: 'Pasión Dulce', title: 'Sabor auténtico con identidad BUBUU', sub: 'Cada creación lleva nuestro sello personal' },
        { tag: 'Detalles que Enamoran', title: 'Pequeños gestos, grandes sonrisas', sub: 'Sorprende a alguien especial sin motivo' },
        { tag: 'Excelencia', title: 'Estándar de calidad en cada entrega', sub: 'Consistencia y sabor en todo momento' },
        { tag: 'Celebraciones', title: 'Haz inolvidable tu próxima reunión', sub: 'El toque dulce que acompaña tus fiestas' },
        { tag: 'Aroma Irresistible', title: 'Imposible resistirse a su encanto', sub: 'El antojo que despierta todos los sentidos' },
        { tag: 'Alma Artesanal', title: 'Tradición y cariño en cada receta', sub: 'Nada reemplaza lo hecho con amor' },
        { tag: 'Tardes Especiales', title: 'Acompaña tus mejores conversaciones', sub: 'Perfecto para café, charla o relax' },
        { tag: 'Sabor Memorables', title: 'Un gusto que siempre querrás repetir', sub: 'De esos sabores que quedan en la memoria' },
        { tag: 'Cuidado al Detalle', title: 'Presentación y sabor a la altura', sub: 'Porque cada entrega merece ser especial' },
        { tag: 'Instantes Felices', title: 'Convierte lo cotidiano en extraordinario', sub: 'Cualquier día es bueno para darte un gusto' },
        { tag: 'Pura Dulzura', title: 'El equilibrio ideal en cada porción', sub: 'Suave, provocativo y lleno de sabor' },
        { tag: 'Fines de Semana', title: 'El plan dulce que no puede faltar', sub: 'Disfruta tus días libres con sabor BUBUU' },
        { tag: 'Calidad Garantizada', title: 'Ingredientes seleccionados con esmero', sub: 'Sabor honesto y calidad de verdad' },
        { tag: 'Regalos con Sentido', title: 'Un detalle dulce que habla por sí solo', sub: 'Demuestra afecto con un antojo artesanal' },
        { tag: 'Magia de Cocina', title: 'Donde el sabor se vuelve emoción', sub: 'Creamos dulzura pensada para ti' },
        { tag: 'Encuentros', title: 'El centro de atención en cada mesa', sub: 'Postres que invitan a probar uno más' },
        { tag: 'Toque Especial', title: 'Ese extra que hace la diferencia', sub: 'Más que un antojo, una experiencia' },
        { tag: 'Sabor Inconfundible', title: 'Reconocible desde el primer vistazo', sub: 'Estilo, color y sabor con personalidad' },
        { tag: 'Alegría al Instante', title: 'Un bocado capaz de cambiar tu ánimo', sub: 'Dulzura que ilumina cualquier momento' },
        { tag: 'Compromiso BUBUU', title: 'Calidad constante en cada pedido', sub: 'Nos esforzamos para superar expectativas' },
        { tag: 'Historias Dulces', title: 'Acompañando tus etapas y logros', sub: 'Presentes en tus mejores capítulos' },
        { tag: 'Placer Artesanal', title: 'Disfruta sin prisas lo bien hecho', sub: 'Texturas y sabores pensados para saborear' },
        { tag: 'Recuerdos Felices', title: 'Cada visita deja un buen recuerdo', sub: 'Momentos que querrás revivir siempre' },
        { tag: 'Siempre BUBUU', title: 'El sabor que siempre te espera', sub: 'Gracias por hacer parte de tu día a día' }
    ];

    const track = document.getElementById('carousel-track');
    const viewport = document.getElementById('carousel-viewport');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const currentCounter = document.getElementById('gallery-current');
    const totalCounter = document.getElementById('gallery-total');
    const progressBar = document.getElementById('gallery-progress-bar');

    const galleryItems = Array.from({ length: TOTAL_FOTOS }, (_, i) => {
        const num = i + 1;
        const info = uniqueMoments[i] || {
            tag: 'BUBUU Artesanal',
            title: 'Sabor y calidad en cada bocado',
            sub: 'Momentos dulces para disfrutar'
        };
        return {
            src: `${IMAGE_FOLDER}${num}.${IMAGE_EXT}`,
            fallback: `https://placehold.co/600x780/5A321E/F6EEC9?text=BUBUU+${encodeURIComponent(info.tag)}`,
            tag: info.tag,
            title: info.title,
            sub: info.sub
        };
    });

    if (totalCounter) {
        totalCounter.textContent = String(galleryItems.length).padStart(2, '0');
    }

    if (track) {
        const fragment = document.createDocumentFragment();
        galleryItems.forEach((item, idx) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.setAttribute('data-index', idx);

            slide.innerHTML = `
                <img src="${item.src}" 
                     alt="${item.title}" 
                     loading="lazy" 
                     onerror="this.onerror=null; this.src='${item.fallback}';">
                <div class="slide-zoom-badge" title="Ampliar imagen">&#43;</div>
                <div class="slide-overlay">
                    <span class="slide-tag">${item.tag}</span>
                    <p class="slide-caption">${item.title}</p>
                    <span class="slide-sub">${item.sub}</span>
                </div>
            `;

            slide.addEventListener('click', () => {
                if (!hasDragged) openLightbox(idx);
            });

            fragment.appendChild(slide);
        });
        track.appendChild(fragment);
    }

    function updateGalleryUI() {
        if (!viewport) return;
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        if (maxScroll <= 0) return;

        const scrollRatio = Math.min(Math.max(viewport.scrollLeft / maxScroll, 0), 1);
        const activeIndex = Math.min(
            Math.round(scrollRatio * (galleryItems.length - 1)) + 1,
            galleryItems.length
        );

        if (currentCounter) {
            currentCounter.textContent = String(activeIndex).padStart(2, '0');
        }
        if (progressBar) {
            progressBar.style.width = `${Math.max(scrollRatio * 100, 3)}%`;
        }
    }

    if (viewport) {
        viewport.addEventListener('scroll', updateGalleryUI, { passive: true });
    }

    const scrollStep = 340;
    if (prevBtn && viewport) {
        prevBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
    }
    if (nextBtn && viewport) {
        nextBtn.addEventListener('click', () => {
            viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    let isDown = false;
    let startX = 0;
    let scrollLeftStart = 0;
    let hasDragged = false;

    if (viewport) {
        viewport.addEventListener('mousedown', (e) => {
            isDown = true;
            hasDragged = false;
            viewport.classList.add('dragging');
            startX = e.pageX - viewport.offsetLeft;
            scrollLeftStart = viewport.scrollLeft;
        });

        viewport.addEventListener('mouseleave', () => {
            isDown = false;
            viewport.classList.remove('dragging');
        });

        viewport.addEventListener('mouseup', () => {
            isDown = false;
            viewport.classList.remove('dragging');
            setTimeout(() => { hasDragged = false; }, 50);
        });

        viewport.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - viewport.offsetLeft;
            const walk = (x - startX) * 1.6;
            if (Math.abs(walk) > 6) hasDragged = true;
            viewport.scrollLeft = scrollLeftStart - walk;
        });
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxIndex = document.getElementById('lightbox-index');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentLightboxIdx = 0;

    function openLightbox(index) {
        currentLightboxIdx = index;
        updateLightboxContent();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const item = galleryItems[currentLightboxIdx];
        lightboxImg.src = item.src;
        lightboxImg.onerror = () => { lightboxImg.src = item.fallback; };
        lightboxTitle.textContent = `${item.tag} — ${item.title}`;
        lightboxIndex.textContent = `${currentLightboxIdx + 1} / ${galleryItems.length}`;
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentLightboxIdx = (currentLightboxIdx - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxContent();
        });
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentLightboxIdx = (currentLightboxIdx + 1) % galleryItems.length;
            updateLightboxContent();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
        if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });

    // =========================================================================
    // 8. SECCIÓN DELUXE B2B: TABS, EFECTO SPOTLIGHT Y CONCIERGE WHATSAPP
    // =========================================================================
    const deluxeTabs = document.querySelectorAll('.deluxe-tab');
    const panelComercios = document.getElementById('panel-comercios');
    const panelEventos = document.getElementById('panel-eventos');
    const b2bTypeSelect = document.getElementById('b2b-type');

    deluxeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            deluxeTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const target = tab.getAttribute('data-tab');
            if (target === 'comercios') {
                panelComercios.hidden = false;
                panelComercios.classList.add('active');
                panelEventos.hidden = true;
                panelEventos.classList.remove('active');
                if (b2bTypeSelect) b2bTypeSelect.selectedIndex = 0;
            } else {
                panelEventos.hidden = false;
                panelEventos.classList.add('active');
                panelComercios.hidden = true;
                panelComercios.classList.remove('active');
                if (b2bTypeSelect) b2bTypeSelect.selectedIndex = 1;
            }
        });
    });

    document.querySelectorAll('.spotlight-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const b2bForm = document.getElementById('b2b-form');
    if (b2bForm) {
        b2bForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('b2b-type').value;
            const zone = document.getElementById('b2b-zone').value;
            const name = document.getElementById('b2b-name').value.trim();

            const message = `Hola equipo de *BUBUU* ✨\n\nMe gustaría recibir información comercial:\n• *Modalidad:* ${type}\n• *Zona en La Guaira:* ${zone}\n• *Local / Evento:* ${name}\n\nQuedo atento(a) a su respuesta.`;
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
        });
    }

    // 9. AÑO AUTOMÁTICO EN EL FOOTER
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});