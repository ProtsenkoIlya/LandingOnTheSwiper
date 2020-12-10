let wrapper = document.querySelector('.wrapper');



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

   //Чтобы вручную запустить инициализацию слайдера, нужно отключить встроенную самим Swiper
   init: false,
   // Мы будем вручную инициализировать, чтобы запустить функнцию меню-слайдер
   //События
   resize: function () {
      setScrollType();
   },
   on: {
      //Событие инициализации
      init: function () {
         wrapper.classList.add('_loaded');
         setScrollType();
         menuSlider();

      },
      //Событие смены слайда
      slideChange: function () {

         menuLinks[pageSlider.realIndex].classList.add('_active');
         menuSliderRemove();
      },

   },

});

// Создаем массив из всех объектов ссылок-меню и присвоем переменную
let menuLinks = document.querySelectorAll('.nav__link');

function menuSlider() {
   if (menuLinks.length > 0) { //проверка есть ли что-то в этом массике, если да, то
      //необходимо сначала узнать на каком слайде мы находимся
      menuLinks[pageSlider.realIndex].classList.add('_active');
      //пробегаем по массиву с помощью цикла, и создадим константу menuLink для каждой из ссылок
      for (let index = 0; index < menuLinks.length; index++) {
         const menuLink = menuLinks[index];
         menuLink.addEventListener("click", function (e) { //создаю событие клик для каждой ссылки
            menuSliderRemove();
            e.preventDefault();// убираю действие ссылки по умолчанию
            pageSlider.slideTo(index, 800);//теперь мне необходимо, чтобы при клике на ссылку мы переместились к соответствующему слайду
            menuLinks.classList.add('_active');//мне нужно на нажатую ссылку навесить класс _active


         });
      }
   }
   //так как каждый ссылке будет присваивать класс, нам нужно удалить его при не активной ссылке
   function menuSliderRemove() {
      let menuLinkActive = document.querySelector('.nav__link._active');//запрашиваю ссылку с классом _active 
      if (menuLinkActive) {
         menuLinkActive.classList.remove('_active');
      }
   }
}

function setScrollType() {
   if (wrapper.classList.contains('_free')) {
      wrapper.classList.remove('_free');
      pageSlider.params.freeMode = false;
   }
   for (let index = 0; index > pageSlider.slides.length; index++) { //мне нужно пробежаться по всем слайдам с помощью цикла
      const pageSlide = pageSlider.slides[index]; // константа, куда будем передавать каждый слайд
      const pageSlideContent = pageSlider.querySelector('.screen__content'); // константа, которая ищет контент внутри каждого слайда
      if (pageSlideContent) {// делаем проверку: есть ли такой див с контентом
         const pageSlideContentHeight = pageSlideContent.offsetHeight; //создаем константу, в которую помещаем высоту этого блока
         if (pageSlideContentHeight > window.innerHeight) {//теперь нужно проверить: больше ли эта высота высоты самого экрана пользователя
            pageSlider.params.freeMode = true;// теперь включаем свободный режим
            wrapper.classList.add('_free'); // добавляем класс, чтобы красиво скрылись точки

            break; // и если хотя бы один блок, в котором контент больше окна браузера, мы прекращаем цикл

         }

      }
   }
}



pageSlider.init();