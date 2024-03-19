// import { Swiper, Navigation, Pagination, Parallax, Autoplay } from "swiper";
// Swiper.use([Navigation, Pagination, Parallax, Autoplay]);

const showHeader = () => {
  const header = document.querySelector(".navigation");
  header.classList.add("show");

  setTimeout(() => {
    header.classList.remove("show");
  }, 3000);
};

const stikyHeader = () => {
  const header = document.querySelector(".navigation");
  window.scrollY >= 10
    ? header.classList.add("sticky")
    : header.classList.remove("sticky");
};

const headerSticky = () => {
  window.addEventListener("scroll", () => {
    stikyHeader();
    showHeader();
  });
};
headerSticky();

// Получаем актуальный год в copiright
const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-date").innerHTML = currentYear;
};
getCurrentYear();

// Проверяем, введен ли текст в форму, если да, добавляем активный цвет
const checkTextInInput = () => {
  const fieldInput = document.querySelectorAll(".field");
  const activeColor = "#4E4E4E";
  fieldInput.forEach((el) => {
    el.addEventListener("change", () => {
      if (el.value) {
        el.style.color = activeColor;
      }
    });
  });
};

// Переход по нажатию кнопок
function goTo() {
  const menuLinks = document.querySelectorAll(".menu__item a");
  const headerHeight = document.querySelector("header").offsetHeight;
  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink, id) => {
      menuLink.addEventListener("click", onButtonClick);
    });

    function onButtonClick(e) {
      const menuLink = e.target;
      if (menuLink.getAttribute("href")) {
        const goToBlock = document.querySelector(menuLink.getAttribute("href"));
        const goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY;
        if (menuLink.getAttribute("href").substring(1) === "about") {
          window.scrollTo({
            top: goToBlockValue - 20,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: goToBlockValue,
            behavior: "smooth",
          });
        }
        e.preventDefault();
      }
    }
  }
}
goTo();

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".menu__item a");
const headerHeight = document.querySelector(".navigation").offsetHeight;
const baseTitle = document.title;
let ticking = false;

function highlightNavLink() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      let fromTop = window.scrollY; // Дополнительное смещение, если нужно
      sections.forEach((section) => {
        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          const id = section.id;
          localStorage.setItem("activeSection", id);
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (id === link.getAttribute("href").substring(1)) {
              link.classList.add("active");
            }
          });
          // Обновляем заголовок страницы с названием активного раздела
          document.title = baseTitle + " - " + section.textContent;
          // Обновляем URL с использованием History API
          history.replaceState(null, null, "#" + id);
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", (e) => {
  highlightNavLink(e);
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`;
});

// Активный пункт меню при загрузке страницы
const activeSection = localStorage.getItem("activeSection");
if (activeSection) {
  navLinks.forEach((link) => {
    if (activeSection === link.getAttribute("href").substring(1)) {
      link.classList.add("active");
    }
  });
}

highlightNavLink();

const toggleBurgerActive = () => {
  const menuButton = document.querySelector("#nav-icon");
  const body = document.querySelector("body");
  const mobile_menu = document.querySelector(".mobile-menu");
  const mobile_menu__link = document.querySelectorAll(".mobile-menu__link");

  mobile_menu__link.forEach(item => {
    item.addEventListener("click", () => {
      menuButton.classList.remove("_active");
      body.classList.remove("_lock");
      mobile_menu.classList.remove("_active");
    });
  })

  menuButton?.addEventListener("click", (event) => {
    if (event.target.closest("#nav-icon")) {
      toggleNavActive();
    }
  });
  const toggleNavActive = () => {
    menuButton.classList.toggle("_active");
    body.classList.toggle("_lock");
    mobile_menu.classList.toggle("_active");
  };
};
toggleBurgerActive();
