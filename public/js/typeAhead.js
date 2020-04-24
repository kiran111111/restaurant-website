// $Attached the CDN LINK for Axios library***************************


function searchResultsHTML(stores){
  return stores.map(store=>{
    return  `
    <a href = "/store/${store._id}" class="search__result">
      <strong>${store.name}</strong>
      <p></p>
    </a>  
    `
  }).join(" ");
}




function typeAhead(search){
  // if(!search)  return;

  const searchInput = document.querySelector('input[name="search"]');
  const searchResults = document.querySelector('.search__results')

  console.log(searchInput,searchResults);

  searchInput.addEventListener("input",function(){
   if(!this.value){
     searchResults.style.display = 'none';
   }
   searchResults.style.display = 'block';

  //  Forming the XHR Request-------------------------------------**********
   axios
   .get(`../api/search?q=${this.value}`)
   .then(res=>{
     if(res.data.length){
       console.log('There is something to show')
       const html = searchResultsHTML(res.data);
       searchResults.innerHTML = html;
     }
   })

  })
}

typeAhead()

// module.exports = typeAhead;

