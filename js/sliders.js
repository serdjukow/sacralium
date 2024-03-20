const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

const swiperText = new Swiper(".slider-text", {
  spaceBetween: 30,
  loop: true,
  effect: "slide",
  speed: 1500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  autoHeight: true,
});

const swiperMedia = new Swiper(".slider-media", {
  spaceBetween: 30,
  loop: false,
  // speed: 2400,
  effect: "fade",
});

// swiperMedia.controller.control = swiperText;
// swiperText.controller.control = swiperMedia;
