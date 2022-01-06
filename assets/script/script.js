window.addEventListener("scroll", navToggel);
const navigationBar = document.querySelector(".main-header");
function navToggel() {
  if (window.scrollY > 170) {
    navigationBar.classList.add("fixedNavbar");
  } else {
    navigationBar.classList.remove("fixedNavbar");
  }
}

const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});


