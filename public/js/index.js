
const HamburgerEl = document.querySelector(".nav__hamburger");
const mobileNavbarCloseEl= document.querySelector(".mobile__navbar--close");
const mobileNavbar= document.querySelector(".mobile__navbar");

HamburgerEl.addEventListener("click",()=>{
 mobileNavbar.style.marginLeft = "0vw";
})

mobileNavbarCloseEl.addEventListener("click",()=>{
 mobileNavbar.style.marginLeft = "-40vw";
})
