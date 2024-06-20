async function fetchData(){
    const response = await fetch ('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    createBreedList(data.message)
}

fetchData()
function  createBreedList(breedList){
    document.getElementById("breed").innerHTML =`
    
     <select onchange="loadByBreed(this.value)">
     <option>Choose a dog Breed</option>
     ${Object.keys(breedList).map(function (breed){
        return`<option>${breed}</option>`
     }).join("")}
    </select>  
    `  

}
 async function loadByBreed(breed){ 
    if(breed!="Choose a dog Breed"){
        const response = await fetch (`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
        console.log(data.message);
        
    }
 }

 function createSlideShow(images){
    let currentPosition = 0
    document.getElementById("slideshow").innerHTML =
    document.getElementById("slideshow").innerHTML =`
    <div class="slide" style ="background-image: url('${images[0]}');"></div>
    <div class="slide" style ="background-image: url('${images[1]}');"></div>`
    currentPosition+=2
setInterval(nextSlide, 3000);


function nextSlide(){
document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<div class="slide" style ="background-image: url('${images[currentPosition]}');"></div>`
)
setTimeout(function(){
    document.querySelector(".slide").remove()
},1000)
if(currentPosition + 1 >= images.length){
    currentPosition = 0
 } else{
currentPosition++
    }
}
}


