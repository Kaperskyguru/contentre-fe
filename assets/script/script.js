window.addEventListener("scroll", navToggel);
const navigationBar = document.querySelector(".main-header");
function navToggel() {
  if (window.scrollY > 170) {
    navigationBar.classList.add("fixedNavbar");
  } else {
    navigationBar.classList.remove("fixedNavbar");
  }
}

const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

button.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});


      //  Social Media Icons Hover Effect
    tippy('#facebook',{
      content:'Facebook',
      animation:'fade',
      delay:[200,200]
    });
    tippy('#instagram',{
      content:'Instagram',
      animation:'fade',
      delay:[200,200]
    });
     tippy('#whatsapp',{
      content:'Whatsapp',
      animation:'fade',
      delay:[200,200]
    });
    tippy('#twitter',{
      content:'Twitter',
      animation:'fade',
      delay:[200,200]
    });

    tippy('#linkedin',{
      content:'Linkedin',
      animation:'fade',
      placement: 'top',
      delay:[200,200]
    });
     tippy('#snapchat',{
      content:'Snapchat',
      animation:'fade',
      placement: 'top',
      delay:[200,200]
    });
 

