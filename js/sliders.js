const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

const swiperText = new Swiper(".slider-text", {
  spaceBetween: 30,
  loop: false,
  effect: "fade",
  speed: 2400,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

const swiperMedia = new Swiper(".slider-media", {
  spaceBetween: 30,
  loop: false,
  speed: 2400,
  effect: "fade",
});

swiperMedia.controller.control = swiperText;
swiperText.controller.control = swiperMedia;
