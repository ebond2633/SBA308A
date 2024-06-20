async function fetchData(){
    const response = await fetch ('https://dog.ceo/dog-api/')
    const data = await response.json()
    createBreedList(data.message)
}

fetchData()
function  createBreedList(breedList){
    document.getElementById("breed").innerHTML=`
    
     <select onchange="loadByBreed(this.value)">
     <option>Choose a dog Breed</option>
     ${Object.keys(breedList).map(function (breed){
        return`<option>${breed}</option>`
     }).join("")}
    </select>    `

}
 async function loadByBreed(breed){ 
    if(breed!="Choose a dog Breed"){
        const response = await fetch (`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
    }
 }

