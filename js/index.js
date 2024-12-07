let siteName = document.getElementById('siteName');
let siteURL = document.getElementById("siteURL");

let warning = document.getElementById('warning');

let btnClose = document.getElementById('close');



let siteList = [];



if (JSON.parse(localStorage.getItem("siteContainer")) !== null) {

    siteList = JSON.parse(localStorage.getItem("siteContainer"));
    displayData();
}



function addSite() {
   if (validationBookName() && validationName()) {
     let sites = {
       name: siteName.value,
       link: siteURL.value,
     };

     siteList.push(sites);

     localStorage.setItem("siteContainer", JSON.stringify(siteList));
     console.log(sites);

     displayData();

     clearForm();
   } else {
     warning.classList.remove("d-none");
   }
}


function clearForm() {
    siteName.value= null;
    siteURL.value= null;
}


function displayData() {
    
    let cartona = '';

    for (let i = 0; i < siteList.length; i++) {
        
        cartona += `<tr>
                    <td>${i + 1}</td>
                    <td>${siteList[i].name}</td>
                    <td><button onclick="visitSite('${siteList[i].link}')" class="btn btn-outline-info">Visit</button></td>
                    <td><button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button></td>
                </tr>`;
    }

    document.getElementById('tableData').innerHTML = cartona;
}


function deleteItem(index){

    siteList.splice(index, 1);

        localStorage.setItem("siteContainer", JSON.stringify(siteList));



    displayData();

    

}


function validationName() {

let urlRegex = /\bhttps?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/;


let text = siteURL.value;

if (urlRegex.test(text)) {

    siteURL.classList.add("is-valid")
    siteURL.classList.remove("is-invalid")

    return true
    
}
else{
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");

    return false

}


}

function validationBookName() {

let bookNameRegex = /^[A-Za-z0-9_-]{3,8}$/;


let text = siteName.value;

if (bookNameRegex.test(text)) {
  siteName.classList.add("is-valid");
  siteName.classList.remove("is-invalid");

  return true;
} else {
  siteName.classList.add("is-invalid");
  siteName.classList.remove("is-valid");

  return false;
}


}


btnClose.addEventListener('click',   function (e) {
    warning.classList.add('d-none')
    
})

document.addEventListener('click',   function (e) {

    if (e.target ===warning ) {
            warning.classList.add("d-none");

    }
    
    
})



function visitSite(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    window.open(url, "_blank");
  }
}