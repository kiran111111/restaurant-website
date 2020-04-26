// $Attached the CDN LINK for Axios library***************************


function nameResultsHTML(stores){
 return `
   <p style="color:red">A store with this name already exists</p>
`
}

function noResults(stores){
 return `
   <p style="color:green">This name is available</p>
`
}


function uniqueAhead(){
 
 const namesearchInput = document.querySelector('input[name="name"]');
 const namesearchResults = document.querySelector('.namesearch__results')


 namesearchInput.addEventListener("input",function(){

  if(!this.value){
    namesearchResults.style.display = 'none';
  }
  
  namesearchResults.style.display = 'block';
  
 //  Forming the XHR Request-------------------------------------**********
  axios
  .get(`../../getlist?q=${this.value}`)
  .then(res=>{
    if(res.data.length>0){
      const html = nameResultsHTML(res.data);
      namesearchResults.innerHTML = html;
    }else{
     const html = noResults(res.data);
     namesearchResults.innerHTML = html;
    }
  })

 })
}

uniqueAhead()

// module.exports = typeAhead;

