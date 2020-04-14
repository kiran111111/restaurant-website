

const HamburgerEl = document.querySelector(".nav__hamburger");
const mobileNavbarCloseEl= document.querySelector(".mobile__navbar--close");
const mobileNavbar= document.querySelector(".mobile__navbar");

const checkboxes = document.getElementsByClassName("choice");
const tagEl = document.getElementsByClassName("tag");



// Set up styles for checkboxes on being checked
for(let i=0;i<tagEl.length;i++){
  tagEl[i].addEventListener("click",function(){
    if(tagEl[i].firstElementChild.checked == false){
      tagEl[i].firstElementChild.checked = true;
      tagEl[i].classList.add("check")
    }
    else{
      tagEl[i].firstElementChild.checked = false;
      tagEl[i].classList.remove("check")
    }
  })
}


//Styles on edit pages 
for( box of checkboxes){
  if(box.checked == true){
   box.parentElement.classList.add("check");
  }
}


HamburgerEl.addEventListener("click",()=>{
  mobileNavbar.style.marginLeft = "0vw";
})
 

 mobileNavbarCloseEl.addEventListener("click",()=>{
  mobileNavbar.style.marginLeft = "-40vw";
 })