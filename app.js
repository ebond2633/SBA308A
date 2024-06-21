let timer 
let deleteFirstPhotoDelay

async function fetchData(){
    try{
        const response = await fetch ('https://dog.ceo/api/breeds/list/all')
        const data = await response.json()
        createBreedList(data.message)
    }catch(e){
    }
    
}

fetchData()
function createBreedList(breedList){
    const breed = document.getElementById("breed")
    const select = document.createElement('select')
    const optionPrompt = document.createElement('option')
    optionPrompt.innerHTML='Choose a dog'
    select.addEventListener('change', (event) => {
        loadByBreed(event.target.value)
    })

    select.append(optionPrompt)
    breed.append(select)
    Object.keys(breedList).map(curBreed => {
        const breedOptions = document.createElement('option')
        breedOptions.innerHTML = curBreed
        select.append(breedOptions)
     })
}

// function createBreedList(breedList){
//     document.getElementById("breed").innerHTML =`
    
//      <select onchange="loadByBreed(this.value)">
//      <option>Choose a dog Breed</option>
//      ${Object.keys(breedList).map(function (breed){
//         return`<option>${breed}</option>`
//      }).join("")}
//     </select>  
//     `  
// }

 async function loadByBreed(breed){ 
    if(breed!="Choose a dog Breed"){
        const response = await fetch (`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        console.log(data)
        createSlideShow(data.message)
        
    }
 }


 function createSlideShow(images){
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
   

if(images.length > 1){
    document.getElementById("slideShow").innerHTML =`
    <div class="slide" style ="background-image: url('${images[0]}');"></div>
    <div class="slide" style ="background-image: url('${images[1]}');"></div>`
    currentPosition+=2
    if(images.length == 2)currentPosition =0 
timer =setInterval(nextSlide, 3000);
}else{
    document.getElementById("slideShow").innerHTML =`
    <div class="slide" style ="background-image: url('${images[0]}');"></div>
    <div class="slide"></div>`
    currentPosition+=2
timer =setInterval(nextSlide, 3000);

}


function nextSlide(){
document.getElementById("slideShow").insertAdjacentHTML("beforeend",`<div class="slide" style ="background-image: url('${images[currentPosition]}');"></div>`
)
deleteFirstPhotoDelay = setTimeout(function(){
    document.querySelector(".slide").remove()
},1000)
if(currentPosition + 1 >= images.length){
    currentPosition = 0
 } else{
currentPosition++
    }
}
}

