// Datos de las paradas con mensajes largos (4 párrafos cada uno)
const stops = [
    {
        id: 1,
        tituloCorto: "Hoy",
        fraseCerrada: "Hoy empieza tu día: 21 vueltas al sol",
        foto: "assets/photos/01-inicio.jpg",
        mensaje: [
            "Hoy no es un día cualquiera. Hoy el calendario se pone bonito porque cumples 21.",
            "Quiero que esta página sea como un caminito: suave, tierno, y lleno de cositas que te recuerden lo especial que eres.",
            "Que este año te traiga calma, risas nuevas, y momentos que se queden contigo mucho tiempo.",
            "Feliz cumpleaños, mi amor. Hoy empieza tu celebración!"
        ]
    },
    {
        id: 2,
        tituloCorto: "La aventura",
        fraseCerrada: "Contigo, cualquier plan se vuelve especial",
        foto: "assets/photos/02-aventura.jpg",
        mensaje: [
            "Cumplir 21 se siente como abrir una puerta nueva. No porque todo cambie de golpe, sino porque tú cambias, con más confianza y más ganas para todo.",
            "Me encanta tu manera de vivir: esa curiosidad, ese ‘vamos a ver qué pasa’, y esa energía que vuelve especial hasta lo más simple.",
            "Este año te regalara planes bonitos, lugares nuevos, experiencias que te llenen el corazón y recuerdos que te hagan sonreír sin esfuerzo.",
            "Hoy celebramos tus 21, pero también celebramos todo lo que viene: tu aventura apenas se pone mejor."
        ]
    },
    {
        id: 3,
        tituloCorto: "Risas",
        fraseCerrada: "Tu alegría hace que todo se sienta más ligero",
        foto: "assets/photos/03-risas.jpg",
        mensaje: [
            "Tu risa tiene algo que cambia la vida. Como si encendiera una luz donde antes no estaba.",
            "Me encanta que tengas esa forma bonita de encontrarle lo bueno a las cosas, incluso cuando el día es muy duro.",
            "Hoy quiero que te rías mucho, de veritas: de lo simple, de lo tonto, de lo inesperado… de la vida.",
            "Que este año te regale razones nuevas para sonreír, y que nunca se te olvide lo increíble que eres."
        ]
    },
    {
        id: 4,
        tituloCorto: "Naturaleza",
        fraseCerrada: "Que este año te trate con cariño",
        foto: "assets/photos/04-calma.jpg",
        mensaje: [
            "Ojalá tus 21 vengan con paz. De esa que no hace ruido, pero lo arregla todo.",
            "Que tengas días lentos cuando los necesites, y fuerza cuando el mundo te pida más de la cuenta.",
            "Que te rodee de gente que te cuide bonito, que te celebre demasiado y que te sume siempre.",
            "Y que, pase lo que pase, recuerdes esto: mereces cosas buenas, y mereces sentirte en casa en tu propia vida."
        ]
    },
    {
        id: 5,
        tituloCorto: "Cumpleaños",
        fraseCerrada: "Por ti, por tus 21, y por todo lo que viene",
        foto: "assets/photos/05-hoy.jpg",
        mensaje: [
            "Hoy el mundo te celebra, pero yo celebro algo más simple: que existas.",
            "Que estos 21 sean un capítulo bonito: de aprender, de crecer, de disfrutar, de elegirte a ti misma con más confianza.",
            "Que no te falte amor del bueno, calma cuando la necesites, y motivos para sentirte orgullosa de ti.",
            "Feliz cumpleaños. Hoy se festeja por ti y por todo lo lindo que todavía falta."
        ]
    }
];

// Variables globales
let currentActiveStop = 0;
let isModalOpen = false;
let finalSectionAnimated = false;
let isTransitioning = false;

// Renderizar paradas
function renderStops() {
    const container = document.getElementById('stops-container');
    if (!container) return;

    container.innerHTML = '';

    stops.forEach((stop, index) => {
        const alignment = index % 2 === 0 ? 'left' : 'right';

        const stopDiv = document.createElement('div');
        stopDiv.className = `stop ${alignment}`;
        stopDiv.dataset.stop = stop.id;

        stopDiv.innerHTML = `
            <div class="stop-number">${stop.id}</div>
            <div class="stop-card" data-id="${stop.id}">
                <div class="stop-hearts ${alignment}">
                    <div class="mini-heart"></div>
                    <div class="mini-heart"></div>
                    <div class="mini-heart"></div>
                </div>
                <h3 class="stop-title">${stop.tituloCorto}</h3>
                <p class="stop-phrase">${stop.fraseCerrada}</p>
            </div>
        `;

        container.appendChild(stopDiv);
    });
}

// Intersection Observer para animaciones de entrada
function setupIntersectionObserver() {
    const options = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.stop').forEach(stop => {
        observer.observe(stop);
    });
}

// Observer para la sección final
function setupFinalSectionObserver() {
    const finalSection = document.querySelector('.final-section');
    if (!finalSection) return;

    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !finalSectionAnimated) {
                finalSectionAnimated = true;
                entry.target.classList.add('animated');
                triggerSparkleHearts();
            }
        });
    }, options);

    observer.observe(finalSection);
}

// Sparkle hearts en sección final
function triggerSparkleHearts() {
    const finalSection = document.querySelector('.final-section');
    if (!finalSection) return;

    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-hearts-container';
    finalSection.appendChild(sparkleContainer);

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'sparkle-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${i * 0.15}s`;
        sparkleContainer.appendChild(heart);
    }

    // Remover después de la animación
    setTimeout(() => {
        sparkleContainer.remove();
    }, 3000);
}

// Actualizar progreso y parada activa
function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    // Actualizar parada activa
    const stopElements = document.querySelectorAll('.stop');
    const viewportCenter = window.innerHeight / 2;

    stopElements.forEach((stopEl, index) => {
        const rect = stopEl.getBoundingClientRect();
        const stopCenter = rect.top + rect.height / 2;

        if (Math.abs(stopCenter - viewportCenter) < 200) {
            setActiveStop(index + 1);
        }
    });

    // Fade instruction section
    const instructionSection = document.querySelector('.instruction-section');
    if (instructionSection && scrollTop > 100) {
        instructionSection.classList.add('fade-out');
    } else if (instructionSection) {
        instructionSection.classList.remove('fade-out');
    }
}

// Establecer parada activa
function setActiveStop(stopNumber) {
    if (currentActiveStop !== stopNumber) {
        currentActiveStop = stopNumber;

        // Actualizar marcadores
        document.querySelectorAll('.marker').forEach((marker, index) => {
            if (index < stopNumber) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });

        // Actualizar tortuga
        const turtleGuide = document.querySelector('.turtle-guide');
        const currentStopSpan = document.getElementById('current-stop');

        if (turtleGuide && currentStopSpan) {
            if (stopNumber > 0) {
                turtleGuide.classList.add('active', 'bounce');
                currentStopSpan.textContent = stopNumber;
                setTimeout(() => turtleGuide.classList.remove('bounce'), 600);
            } else {
                turtleGuide.classList.remove('active');
            }
        }
    }
}

// Scroll suave
function smoothScrollTo(element) {
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Abrir modal
function openModal(stopId) {
    const stop = stops.find(s => s.id === stopId);
    if (!stop) return;

    isModalOpen = true;
    const modal = document.getElementById('modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalNext = document.getElementById('modal-next');

    if (!modal || !modalImg || !modalTitle || !modalMessage || !modalNext) return;

    // Configurar contenido
    modalImg.src = stop.foto;
    modalImg.alt = stop.tituloCorto;
    modalTitle.textContent = stop.tituloCorto;

    // Renderizar párrafos
    modalMessage.innerHTML = '';
    stop.mensaje.forEach(parrafo => {
        const p = document.createElement('p');
        p.textContent = parrafo;
        modalMessage.appendChild(p);
    });

    // Reset visual/estado botón siguiente
    modalNext.disabled = false;
    modalNext.classList.remove('transitioning');

    // Mostrar/ocultar botón siguiente o botón final
    const modalFinal = document.getElementById('modal-final');

    if (stopId < 5) {
        // Paradas 1-4: mostrar botón "Siguiente parada"
        modalNext.style.display = 'flex';
        modalNext.onclick = () => nextStop(stopId);
        if (modalFinal) modalFinal.style.display = 'none';
    } else {
        // Parada 5: mostrar botón "Ver mensaje final"
        modalNext.style.display = 'none';
        if (modalFinal) {
            modalFinal.style.display = 'flex';
            modalFinal.onclick = () => goToFinalSection();
        }
    }

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Partículas de corazones
    createHeartParticles();
}

// Cerrar modal
function closeModal() {
    isModalOpen = false;
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = 'auto';
}

// Detectar cuando el scroll termina (estable en móvil)
function detectScrollEnd(targetPosition, callback) {
    let lastScrollY = window.scrollY;
    let samePositionCount = 0;
    let frameCount = 0;
    const maxFrames = 120; // 2 segundos máximo (60fps * 2)
    const tolerance = 5; // Píxeles de tolerancia

    function checkScroll() {
        frameCount++;
        const currentScrollY = window.scrollY;

        // Verificar si llegamos al destino o si el scroll se detuvo
        const reachedTarget = Math.abs(currentScrollY - targetPosition) < tolerance;
        const scrollStopped = Math.abs(currentScrollY - lastScrollY) < 1;

        if (scrollStopped) {
            samePositionCount++;
        } else {
            samePositionCount = 0;
        }

        // Condiciones para considerar que el scroll terminó
        if (reachedTarget || samePositionCount >= 3 || frameCount >= maxFrames) {
            callback();
            return;
        }

        lastScrollY = currentScrollY;
        requestAnimationFrame(checkScroll);
    }

    requestAnimationFrame(checkScroll);
}

// Siguiente parada con apertura automática del modal
function nextStop(currentId) {
    const modalNext = document.getElementById('modal-next');

    // Prevenir clics múltiples
    if (isTransitioning) return;
    isTransitioning = true;

    // Feedback visual
    if (modalNext) {
        modalNext.classList.add('transitioning');
        modalNext.disabled = true;
    }

    const currentIndex = stops.findIndex(s => s.id === currentId);

    // Verificar que existe una siguiente parada
    if (currentIndex === -1 || currentIndex >= stops.length - 1) {
        isTransitioning = false;
        if (modalNext) {
            modalNext.classList.remove('transitioning');
            modalNext.disabled = false;
        }
        return;
    }

    const nextStopId = currentId + 1;
    const nextStopElement = document.querySelector(`.stop[data-stop="${nextStopId}"]`);

    // Fail-safe: si no encuentra el elemento
    if (!nextStopElement) {
        console.warn('No se encontró la siguiente parada');
        isTransitioning = false;
        if (modalNext) {
            modalNext.classList.remove('transitioning');
            modalNext.disabled = false;
        }
        closeModal();
        return;
    }

    // 1. Cerrar modal actual
    closeModal();

    // 2. Hacer scroll suave
    setTimeout(() => {
        const targetPosition = nextStopElement.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (nextStopElement.offsetHeight / 2);

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // 3. Detectar cuando el scroll termina y abrir el siguiente modal
        detectScrollEnd(targetPosition, () => {
            // Abrir el modal de la siguiente parada
            setTimeout(() => {
                openModal(nextStopId);
                isTransitioning = false;
            }, 150);
        });
    }, 350);
}

// Crear partículas de corazones
function createHeartParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'particle-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${i * 0.1}s`;
        container.appendChild(heart);
    }

    // Limpiar después de la animación
    setTimeout(() => {
        container.innerHTML = '';
    }, 2500);
}

// ============================================
// SORPRESA FINAL - TORTUGA EXPLOSIÓN
// ============================================

let turtleExploded = false;

function initTurtleSurprise() {
    const turtleFinal = document.querySelector('.turtle-final');
    const overlay = document.getElementById('turtle-surprise-overlay');
    const closeBtn = document.querySelector('.surprise-close');

    if (!turtleFinal || !overlay || !closeBtn) return;

    // Hacer la tortuga accesible
    turtleFinal.setAttribute('role', 'button');
    turtleFinal.setAttribute('tabindex', '0');
    turtleFinal.setAttribute('aria-label', 'Sorpresa final de cumpleaños');

    // Click en la tortuga
    turtleFinal.addEventListener('click', handleTurtleClick);
    turtleFinal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTurtleClick();
        }
    });

    // Cerrar overlay
    closeBtn.addEventListener('click', closeSurpriseOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeSurpriseOverlay();
        }
    });

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeSurpriseOverlay();
        }
    });
}

function handleTurtleClick() {
    const turtleFinal = document.querySelector('.turtle-final');

    if (!turtleExploded) {
        turtleExploded = true;
        explodeTurtle(turtleFinal);

        setTimeout(() => {
            openSurpriseOverlay();
        }, 800);
    } else {
        openSurpriseOverlay();
    }
}

function explodeTurtle(turtle) {
    if (!turtle) return;

    turtle.classList.add('exploding');

    const rect = turtle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        createExplosionParticle(centerX, centerY, i, 12);
    }

    setTimeout(() => {
        turtle.classList.remove('exploding');
    }, 800);
}

function createExplosionParticle(x, y, index, total) {
    const particle = document.createElement('div');
    particle.className = 'explosion-particle';

    const angle = (index / total) * Math.PI * 2;
    const distance = 150 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

function openSurpriseOverlay() {
    const overlay = document.getElementById('turtle-surprise-overlay');
    const heartsContainer = document.querySelector('.surprise-hearts');

    if (!overlay || !heartsContainer) return;

    overlay.classList.add('active');
    document.body.classList.add('surprise-active');

    createSurpriseHearts(heartsContainer);
}

function closeSurpriseOverlay() {
    const overlay = document.getElementById('turtle-surprise-overlay');
    const heartsContainer = document.querySelector('.surprise-hearts');

    if (!overlay || !heartsContainer) return;

    overlay.classList.remove('active');
    document.body.classList.remove('surprise-active');

    heartsContainer.innerHTML = '';
}

function createSurpriseHearts(container) {
    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'surprise-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.animationDelay = (i * 0.3) + 's';
        heart.style.animationDuration = (4 + Math.random() * 2) + 's';
        container.appendChild(heart);
    }
}

// ============================================
// IR A SECCIÓN FINAL Y RESALTAR TORTUGA
// ============================================

let isGoingToFinal = false;

function goToFinalSection() {
    // Prevenir clics múltiples
    if (isGoingToFinal) return;
    isGoingToFinal = true;

    const modalFinal = document.getElementById('modal-final');
    if (modalFinal) {
        modalFinal.classList.add('transitioning');
        modalFinal.disabled = true;
    }

    const finalSection = document.querySelector('.final-section');
    if (!finalSection) {
        console.warn('No se encontró la sección final');
        isGoingToFinal = false;
        if (modalFinal) {
            modalFinal.classList.remove('transitioning');
            modalFinal.disabled = false;
        }
        return;
    }

    // 1. Cerrar modal
    closeModal();

    // 2. Hacer scroll suave a la sección final
    setTimeout(() => {
        const targetPosition = finalSection.getBoundingClientRect().top + window.scrollY - 100;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // 3. Detectar cuando el scroll termina y resaltar la tortuga
        detectScrollEnd(targetPosition, () => {
            setTimeout(() => {
                highlightTurtleFinal();
                isGoingToFinal = false;

                // Rehabilitar botón para futuros usos
                if (modalFinal) {
                    modalFinal.classList.remove('transitioning');
                    modalFinal.disabled = false;
                }
            }, 300);
        });
    }, 350);
}

function highlightTurtleFinal() {
    const turtle = document.querySelector('.turtle-final');
    if (!turtle) return;

    // Animación de resalte
    turtle.classList.add('highlight');

    // Después del highlight, agregar pulso continuo y ring
    setTimeout(() => {
        turtle.classList.remove('highlight');
        turtle.classList.add('pulsing', 'with-ring');

        // Remover pulso y ring después de 10 segundos
        setTimeout(() => {
            turtle.classList.remove('pulsing', 'with-ring');
        }, 10000);
    }, 2000);
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Renderizar paradas
    renderStops();
    setupIntersectionObserver();
    setupFinalSectionObserver();

    // Botón inicial
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const firstStop = document.querySelector('.stop[data-stop="1"]');
            smoothScrollTo(firstStop);

            const turtleHero = document.querySelector('.turtle-hero');
            if (turtleHero) {
                turtleHero.style.animation = 'none';
                setTimeout(() => {
                    turtleHero.style.animation = 'bounce 0.6s ease';
                }, 10);
            }
        });
    }

    // Botón volver al inicio
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Abrir modal al click en tarjetas
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.stop-card');
        if (card) {
            const stopId = parseInt(card.dataset.id);
            openModal(stopId);
        }
    });

    // Cerrar modal
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                closeModal();
            }
        });
    }

    // Tecla Escape para modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });

    // Scroll progress
    window.addEventListener('scroll', updateProgress);

    // Inicializar sorpresa de tortuga
    initTurtleSurprise();
});
