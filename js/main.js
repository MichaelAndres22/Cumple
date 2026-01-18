// Datos de las paradas con mensajes largos (4 párrafos cada uno)
const stops = [
    {
        id: 1,
        tituloCorto: "El inicio",
        fraseCerrada: "Sin saberlo, ahí empezó mi lugar favorito",
        foto: "assets/photos/01-inicio.jpg",
        mensaje: [
            "¿Recuerdas ese momento? Yo sí. Cada detalle está guardado como si fuera ayer.",
            "No sabía que ese día marcaría el inicio de algo tan bonito. Tampoco imaginaba que encontraría en ti un hogar, una aventura y una calma al mismo tiempo.",
            "Desde entonces, todo cambió. Las cosas simples se volvieron especiales, los días grises encontraron color, y yo encontré mi lugar favorito: a tu lado.",
            "Gracias por ese inicio. Desde ese día, todo se siente más bonito contigo."
        ]
    },
    {
        id: 2,
        tituloCorto: "La aventura",
        fraseCerrada: "Contigo, cualquier plan se vuelve especial",
        foto: "assets/photos/02-aventura.jpg",
        mensaje: [
            "Me encanta cómo convertimos cualquier plan en una aventura. No importa si es algo grande o simple, contigo todo tiene magia.",
            "Esos momentos explorando juntos, descubriendo rincones nuevos, probando cosas por primera vez… cada experiencia a tu lado se queda grabada con una sonrisa.",
            "Tú haces que lo ordinario se vuelva extraordinario. Gracias por mostrarme el mundo desde tus ojos, por enseñarme a disfrutar el camino tanto como el destino.",
            "Me encanta descubrir el mundo a tu lado, y sé que nos quedan mil aventuras por vivir juntos."
        ]
    },
    {
        id: 3,
        tituloCorto: "Risas",
        fraseCerrada: "Gracias por mis carcajadas favoritas",
        foto: "assets/photos/03-risas.jpg",
        mensaje: [
            "Tu risa es de esas cosas que se quedan en el corazón. Cuando te ríes, todo lo demás desaparece y solo queda ese momento perfecto.",
            "Gracias por las bromas tontas, por los chistes internos que nadie más entiende, por reírte de mis ocurrencias y hacerme reír incluso en los días difíciles.",
            "Esos momentos de risa compartida son de los que más atesoro. Son luz pura, alegría sin filtro, y uno de mis recuerdos favoritos siempre será el sonido de tu felicidad.",
            "Tu risa es de las cosas que más quiero cuidar."
        ]
    },
    {
        id: 4,
        tituloCorto: "Calma",
        fraseCerrada: "Aquí el mundo baja el volumen",
        foto: "assets/photos/04-calma.jpg",
        mensaje: [
            "En medio del ruido y el caos del mundo, tú eres mi refugio. Contigo el tiempo va más lento, las preocupaciones pesan menos, y todo encuentra su lugar.",
            "Me gusta la calma que traes, esa paz que no necesita palabras. Estar a tu lado es como llegar a casa después de un largo día.",
            "Gracias por ser mi espacio seguro, por entenderme sin que tenga que explicar, por darme paciencia cuando la pierdo y por recordarme que todo va a estar bien.",
            "Contigo encuentro paz, hogar y paciencia. Eres mi lugar tranquilo en este mundo acelerado."
        ]
    },
    {
        id: 5,
        tituloCorto: "Hoy",
        fraseCerrada: "21 años de luz… y yo feliz de estar cerca",
        foto: "assets/photos/05-hoy.jpg",
        mensaje: [
            "Hoy celebras 21 años de existir, de llenar el mundo de luz, de ser exactamente quien eres. Y yo tengo el privilegio de estar aquí, celebrándote.",
            "Cada año que pasa eres más tú: más fuerte, más brillante, más increíble. Verte crecer, evolucionar y conquistar tus sueños es uno de los regalos más bonitos que me ha dado la vida.",
            "Quiero que sepas que te admiro profundamente. Tu forma de ver el mundo, tu bondad, tu risa, tu valentía… todo en ti me inspira a ser mejor.",
            "Feliz cumpleaños, mi amor. Hoy brindo por ti, por tus 21 años, por todo lo que eres y todo lo que serás. Te elijo hoy y siempre."
        ]
    }
];

// Variables globales
let currentActiveStop = 0;
let isModalOpen = false;
let finalSectionAnimated = false;

// Renderizar paradas
function renderStops() {
    const container = document.getElementById('stops-container');
    
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
    
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    
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
    if (scrollTop > 100) {
        instructionSection.classList.add('fade-out');
    } else {
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
        
        if (stopNumber > 0) {
            turtleGuide.classList.add('active', 'bounce');
            currentStopSpan.textContent = stopNumber;
            setTimeout(() => turtleGuide.classList.remove('bounce'), 600);
        } else {
            turtleGuide.classList.remove('active');
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
    
    // Mostrar/ocultar botón siguiente
    if (stopId < 5) {
        modalNext.style.display = 'flex';
        modalNext.onclick = () => nextStop(stopId);
    } else {
        modalNext.style.display = 'none';
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
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Siguiente parada
function nextStop(currentId) {
    closeModal();
    setTimeout(() => {
        const currentIndex = stops.findIndex(s => s.id === currentId);
        if (currentIndex < stops.length - 1) {
            const nextStopElement = document.querySelector(`.stop[data-stop="${currentId + 1}"]`);
            smoothScrollTo(nextStopElement);
        }
    }, 300);
}

// Crear partículas de corazones
function createHeartParticles() {
    const container = document.getElementById('particles-container');
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderStops();
    setupIntersectionObserver();
    setupFinalSectionObserver();
    
    // Botón inicial
    document.getElementById('start-btn').addEventListener('click', () => {
        const firstStop = document.querySelector('.stop[data-stop="1"]');
        smoothScrollTo(firstStop);
        
        // Animar tortuga
        const turtleHero = document.querySelector('.turtle-hero');
        turtleHero.style.animation = 'none';
        setTimeout(() => {
            turtleHero.style.animation = 'bounce 0.6s ease';
        }, 10);
    });
    
    // Botón volver al inicio
    document.getElementById('restart-btn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Abrir modal al click en tarjetas
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.stop-card');
        if (card) {
            const stopId = parseInt(card.dataset.id);
            openModal(stopId);
        }
    });
    
    // Cerrar modal
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'modal-overlay') {
            closeModal();
        }
    });
    
    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
    });
    
    // Scroll progress
    window.addEventListener('scroll', updateProgress);
});