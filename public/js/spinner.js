

function spinner(){

 const spinnerEl = document.querySelector(".spinner-wrapper");

 //  Forming the XHR Request-------------------------------------**********
  axios
  .post(`/stores`)
  .then(res=>{
   if(res){
     console.log("rotate")
   }
  })
}

// spinner()