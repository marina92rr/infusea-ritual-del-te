/**
 * Descripción: 
 * Este archivo JavaScript contiene la lógica Infusea.
 *
 * Funciones:
 * - Slider automático con navegación por puntos
 * - Acordeón para la sección de preguntas frecuentes
 * - Animaciones al entrar elementos en el viewport
 */

//Funcion Anonima IIFE
(function () {
  /* __________________________________________________________
   SLIDER PRINCIPAL
   Descripción: Controla el slider automático de la página de inicio,
   permitiendo navegación manual mediante dots y autoplay.
  __________________________________________________________*/

  //Agrupa todos los slides
  const wrapper = document.querySelector('.slides__wrapper');
  // Conjunto de slides
  const slides = document.querySelectorAll('.my__slides');
  // Navegación
  const dots = document.querySelectorAll('.dot');


  /**
  * comprobación de si el slider existe,
  * evita errores en las demás páginas(infusiones, tés, contacto y matcha).
  */
  if (wrapper && slides.length > 0) {
    let index = 0;

    // Clonación del primer slide para permitir un bucle continuo, evita que quede slide blanco
    wrapper.appendChild(slides[0].cloneNode(true));

    //Mostrar imagen segun el dot seleccionado
    function currentSlide(n) {
      slideIndex = n - 1;
      // Desplazamiento del slider a la posición correspondiente
      wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;    //Desplazar el slider
      // Actualización del estado visual de los dots
      dots.forEach(dot => dot.classList.remove('active'));              //Quitar la clase active de todos los dots
      dots[slideIndex].classList.add('active');                         //Agregar la clase active al dot seleccionado
    }

    // Se expone la función para poder ser usada desde el HTML
    window.currentSlide = currentSlide;

    /**
     * Reproducción automática del slider
     * Cambia el slide cada cierto intervalo de tiempo
     */
    setInterval(() => {
      index++;

      wrapper.style.transition = 'transform 2s ease';
      wrapper.style.transform = `translateX(-${index * 100}%)`;

      // Actualización de dots activos
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');

      /**
       * Reinicio del slider al llegar a la última slide
       */
      if (index === slides.length) {
        setTimeout(() => {
          wrapper.style.transition = 'none';
          wrapper.style.transform = 'translateX(0)';
          index = 0;
          dots[0].classList.add('active');
        }, 2000);
      }
    }, 6000);
  }

  /* __________________________________________________________
    ACORDEÓN - PREGUNTAS FRECUENTES
    Descripción: Controla la apertura y cierre de los bloques de preguntas,
    mostrando solo uno activo a la vez.
    __________________________________________________________ */
  document.addEventListener('DOMContentLoaded', () => {
    // Bloques completos del acordeón
    const bloque = document.querySelectorAll('.bloque');
    // Títulos clicables del acordeón
    const h3 = document.querySelectorAll('.h3');
    /**
     * Recorre y asigna un evento click a cada título para activar
     * su bloque correspondiente
     */
    h3.forEach((cadah2, i) => {
      cadah2.addEventListener('click', () => {
        // Se desactivan todos los bloques
        bloque.forEach(cadaBloque => {
          cadaBloque.classList.remove('activo')
        })
        // Se activa el bloque seleccionado
        bloque[i].classList.add('activo')
      })
    })
  })
  /* __________________________________________________________
     ANIMACIONES AL ENTRAR EN EL VIEWPORT
     Descripción: Aplica animacion de opacidad y desplazamiento a los elementos cuando entran
     en la zona visible de la pantalla, un 20%.
     __________________________________________________________ */
  document.addEventListener('DOMContentLoaded', () => {
    // Elementos que deben animarse al entrar en el viewport
    const reveals = document.querySelectorAll('.reveal');

    /**
     * Observador que detecta cuándo un elemento
     * entra en el viewport
     */
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Se activa la animación del elemento
            entry.target.classList.add('visible');
            // Se deja de observar una vez animado
            observer.unobserve(entry.target);
          }
        });
      },
      {
        /**
     * threshold: Indica el porcentaje del elemento que debe ser visible en el viewport para activar la animación.
     * En este caso, se activa cuando al menos el 20% es visible.
     */
        threshold: 0.2,
      }
    );
    // Se observa cada elemento con clase "reveal"
    reveals.forEach(el => observer.observe(el));
  });
})();
