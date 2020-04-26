

// Cache the variables
const HamburgerEl = document.querySelector(".nav__hamburger");
const mobileNavbarCloseEl= document.querySelector(".mobile__navbar--close");
const mobileNavbar= document.querySelector(".mobile__navbar");

const heartsEl= document.querySelector("#heart__count");
const checkboxes = document.getElementsByClassName("choice");
const tagEl = document.getElementsByClassName("tag");

// Variables for autocomplete
const latEl = document.querySelector("#lat");
const lngEl = document.querySelector("#lng");
const addressEl = document.querySelector("#address");




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


// console.log(heartsEl.firstElementChild.innerHTML)
// // variables for the hearted stores
// heartsEl.addEventListener("click",function(){
//   heartsEl.classList.toggle("hearted");
// })

// if(heartsEl.firstElementChild.innerHTML > 0){
//   heartsEl.classList.add("hearted");
// }



HamburgerEl.addEventListener("click",()=>{
  mobileNavbar.style.marginLeft = "0vw";
})
 
mobileNavbarCloseEl.addEventListener("click",()=>{
  mobileNavbar.style.marginLeft = "-40vw";
 })


// Code for cusotmized maps on each store----- 
 if(document.getElementById("latitude")){

  var map;
  var L1 = document.getElementById("latitude").innerHTML;
  var L2 = document.getElementById("longitude").innerHTML;
  var center = { lat:Number(L1), lng:Number(L2)}
    
   function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 13
    });
    var marker = new google.maps.Marker({position: center, map: map});
  }
}



// Code for  Autocomplete search input------
function initMap(){
   if(!addressEl){
     return ;
   }

   var autocomplete = new google.maps.places.Autocomplete(addressEl);
   autocomplete.addListener('place_changed',()=>{
     const place = autocomplete.getPlace();
     latEl.value = place.geometry.location.lat();
     lngEl.value = place.geometry.location.lng();
   })

  //  if someone hits enter on address field then dont submit form
  addressEl.addEventListener("keydown",(e)=>{
    if(e.keycode == 13) e.preventDefault();
  })
}

  





