

// Front end validation for the name of the stores---**
const namePatt = /^([a-zA-Z-]*)$/;
const nameInput = document.getElementById("name");
const namesearchValidEl = document.querySelector(".namesearch__valid");


$(document).ready(function(){
 $("#name").keyup(function(){
   
   if(namePatt.test(nameInput.value.trim()) == false ){
     namesearchValidEl.innerHTML= "Name should consist of just alphabets , can be separated by hyphens";
      namesearchValidEl.style.color = "red";  
       nameInput.style.border ="2px solid red";     
   }
   else{    
       nameInput.style.border ="2px solid green"; 
       namesearchValidEl.innerHTML = "Valid";
       namesearchValidEl.style.color = "green";  
   }
 });
});