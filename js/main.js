
//Funcion Anonima IIFE


(function () {
//INICIO
// Slider 
const wrapper = document.querySelector('.slides__wrapper');
const slides = document.querySelectorAll('.my__slides');
const dots = document.querySelectorAll('.dot');

let index = 0;

// clonar la primera slide para no retroceder al inicio bruscamente
wrapper.appendChild(slides[0].cloneNode(true));

//Mostrar imagen segun el dot seleccionado
function currentSlide(n) {
  slideIndex = n - 1;
  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;    //Desplazar el slider

  dots.forEach(dot => dot.classList.remove('active'));              //Quitar la clase active de todos los dots
  dots[slideIndex].classList.add('active');                         //Agregar la clase active al dot seleccionado
}

  // exponer solo esta función
  window.currentSlide = currentSlide;

// autoplay
setInterval(() => {
  index++;

  wrapper.style.transition = 'transform 2s ease';
  wrapper.style.transform = `translateX(-${index * 100}%)`;

  // Actualizar dots
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');

  // Reiniciar al inicio
  if (index === slides.length) {
    setTimeout(() => {
      wrapper.style.transition = 'none';
      wrapper.style.transform = 'translateX(0)';
      index = 0;
      dots[0].classList.add('active');
    }, 2000);
  }
}, 6000);

//FIN
})();
