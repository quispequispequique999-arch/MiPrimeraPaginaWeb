const btnNo = document.getElementById('btnNo');
const btnSi = document.getElementById('btnSi');
const mainVideo = document.getElementById('mainVideo');
const videoSource = document.getElementById('videoSource');
const titulo = document.getElementById('titulo');
const subtitulo = document.getElementById('subtitulo');
const progressBar = document.getElementById('progressBar');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const heartsBg = document.getElementById('heartsBg');

// Configuración de niveles con tus videos locales
const niveles = [
  {
    porcentaje: "25%",
    video: "video1.mp4",
    titulo: "¿Sabías que me gustas muchísimo? 🙈",
    subtitulo: "Y no hablo de un 'poquito'... hablo de algo en serio ❤️",
    btnSiTexto: "¡Cuéntame más!",
    btnNoTexto: "No me importa 😜"
  },
  {
    porcentaje: "50%",
    video: "video2.mp4",
    titulo: "Cada momento contigo es genial ✨",
    subtitulo: "¿Aceptas que sigamos creando recuerdos lindos juntos?",
    btnSiTexto: "¡Obvio que sí! 🥰",
    btnNoTexto: "Paso... 🙅‍♂️"
  },
  {
    porcentaje: "75%",
    video: "video3.mp4",
    titulo: "Llegó el momento de la verdad... 🔥",
    subtitulo: "He estado pensando en esto por mucho tiempo. ¿Estás lista?",
    btnSiTexto: "¡Estoy lista! 💖",
    btnNoTexto: "Me da miedo 😱"
  },
  {
    porcentaje: "100%",
    video: "video_pregunta.mp4",
    titulo: "¿Quieres ser mi novia? ❤️✨",
    subtitulo: "Prometo cuidar tu corazón y sacarte sonrisas todos los días.",
    btnSiTexto: "¡¡SÍ, ACEPTO!! 😍",
    btnNoTexto: "No 💔"
  }
];

let nivelActual = 0;
let modoHuirIniciado = false;

// Al hacer el PRIMER CLIC o toque en la pantalla, se activa el sonido del video y de la música
document.body.addEventListener('click', () => {
  // Desactivar silencio del video y reproducir
  mainVideo.muted = false;
  mainVideo.play();

  // Iniciar canción de fondo si está pausada
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.innerText = '🎵 Música: ON';
    musicToggle.style.background = '#ff4b5c';
    musicToggle.style.color = 'white';
  }
}, { once: true });

// Función para cambiar de video
function cambiarVideo(nuevoSrc) {
  videoSource.src = nuevoSrc;
  mainVideo.load();
  mainVideo.muted = false; // Mantiene el sonido activado
  mainVideo.play();
}

// Control del avance de niveles
btnSi.addEventListener('click', () => {
  nivelActual++;

  if (nivelActual < niveles.length) {
    const data = niveles[nivelActual];
    progressBar.style.width = data.porcentaje;
    
    // Cambiamos el video al del siguiente nivel
    cambiarVideo(data.video);

    titulo.innerText = data.titulo;
    subtitulo.innerText = data.subtitulo;
    btnSi.innerText = data.btnSiTexto;
    btnNo.innerText = data.btnNoTexto;

    if (nivelActual === niveles.length - 1) {
      modoHuirIniciado = true;
      btnNo.style.position = 'absolute';
    }
  } else {
    finalExitoso();
  }
});

// Función para esquivar el botón NO
function moverBotonNo() {
  if (!modoHuirIniciado) return;

  const margin = 20;
  const maxX = window.innerWidth - btnNo.offsetWidth - margin;
  const maxY = window.innerHeight - btnNo.offsetHeight - margin;

  const randomX = Math.max(margin, Math.floor(Math.random() * maxX));
  const randomY = Math.max(margin, Math.floor(Math.random() * maxY));

  btnNo.style.position = 'fixed';
  btnNo.style.left = `${randomX}px`;
  btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseover', moverBotonNo);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moverBotonNo();
});

// Pantalla final
function finalExitoso() {
  btnNo.style.display = 'none';
  cambiarVideo("video_final.mp4");
  titulo.innerText = "¡SABÍA QUE DIRÍAS QUE SÍ! 🥰🎉";
  subtitulo.innerText = "Me haces la persona más feliz del mundo. ¡Te amo! ❤️✨";
  
  btnSi.style.transform = 'scale(1.2)';
  btnSi.innerText = '💖 ¡JUNTOS POR SIEMPRE! 💖';

  lanzarConfeti();
}

// Control del botón de música
musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.innerText = '🎵 Música: ON';
    musicToggle.style.background = '#ff4b5c';
    musicToggle.style.color = 'white';
  } else {
    bgMusic.pause();
    musicToggle.innerText = '🎵 Música: OFF';
    musicToggle.style.background = 'rgba(255, 255, 255, 0.9)';
    musicToggle.style.color = '#ff4b5c';
  }
});

// Confeti
function lanzarConfeti() {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}

// Corazones de fondo
function crearCorazones() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heartsBg.appendChild(heart);
  }
}

crearCorazones();