const cards = document.getElementById('card-dinamicas')
const templateCard = document.getElementById('template-card').content 
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    // fetchDATA se ejecuta hasta que carge el DOM
    fetchData()
})
const fetchData = async () =>{
   // console.log('obteniendo datos')
    try {
        loadingData(true)
        
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        
        //console.log(data)
        pintarCard(data)

    } catch (error) {
        console.log(error)
        
    }finally{
        loadingData(false)                                        
    }
}  

const pintarCard = (data) => {
   // console.log(data)
    data.results.forEach((item) => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector("h5").textContent = item.name
        clone.querySelector("p").textContent = item.species
        clone.querySelector(".card-img-top").setAttribute("src", item.image)


        //guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone)

       // console.log(item)
    });
    cards.appendChild(fragment)
}




const loadingData = (estado) =>{
    const loading = document.getElementById('loading')
    if (estado){
            loading.classList.remove('d-none')
        } else {
            loading.classList.add('d-none')
        }
    }

