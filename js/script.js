let pageSlider = new Swiper('.page', {
   //Свои классы
   wrapperClass: "page__wrapper",
   slideClass: "page__screen",

   direction: 'vertical',

   //Количество слайдов для показа 
   slidesPerView: 'auto',


   parallax: true,

   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
   },

   mousewheel: {
      sensitivity: 1,
   },

   watchOverflow: true,

   speed: 800,

   // refresh Slider

   observer: true,

   observerParents: true,

   observerSlideChildren: true,


   // Pagination: bullets

   pagination: {
      el: '.page__pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: "page__bullet",
      bulletActiveClass: "page__bullet_active",
   },

   scrollbar: {
      el: '.page__scroll',
      dragClass: "page__drag-scroll",
      draggable: true,
   },

})