let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
.then(response => response.json())
.then(data =>{
    let urlString = window.location.href
    let urlArmada = new URL(urlString)
    let parametros = new URLSearchParams(urlArmada.search)
    let id = parametros.get("id")
    let estimate = parametros.get("estimate")
    let assistance = parametros.get("assistance")
    let dataAssistance = data.events.filter(evento => evento.assistance == assistance && evento._id == id)
    let dataEstimate = data.events.filter(evento => evento.estimate == estimate && evento._id == id)
    let dataNueva = data.events.filter(evento => evento._id == id)

//Datos para la vista de +1025px
    document.getElementById("title").innerHTML = dataNueva[0].name
    document.getElementById("date").innerHTML = dataNueva[0].date
    document.getElementById("description").innerHTML = dataNueva[0].description
    document.getElementById("category").innerHTML = dataNueva[0].category
    document.getElementById("place").innerHTML = dataNueva[0].place
    document.getElementById("capacity").innerHTML = dataNueva[0].capacity
    document.getElementById("price").innerHTML = dataNueva[0].price
    document.getElementById("imagen").src=dataNueva[0].image

    if (dataEstimate.length !=0) {
        document.getElementById("assistanceEstimate").innerHTML = `
        <h5 class="card-title d-inline">Estimate:</h5>
        <p id="assistance" class="card-text d-inline"> ${dataEstimate[0].estimate}</p> <br>`
    }
    if (dataAssistance.length !=0){
        document.getElementById("assistanceEstimate").innerHTML = `
        <h5 class="card-title d-inline">Assistance:</h5>
        <p id="assistance" class="card-text d-inline"> ${dataNueva[0].assistance}</p> <br>`
        
    }

//Datos para la vista de -1025px
    document.getElementById("titleRP").innerHTML = dataNueva[0].name
    document.getElementById("dateRP").innerHTML = dataNueva[0].date
    document.getElementById("descriptionRP").innerHTML = dataNueva[0].description
    document.getElementById("categoryRP").innerHTML = dataNueva[0].category
    document.getElementById("placeRP").innerHTML = dataNueva[0].place
    document.getElementById("capacityRP").innerHTML = dataNueva[0].capacity
    
    if (dataEstimate.length !=0) {
        document.getElementById("assistanceEstimateRP").innerHTML = `
        <h5 class="card-title d-inline mb-3">Estimate:</h5><br>
        <p id="assistance" class="card-text d-inline"> ${dataEstimate[0].estimate}</p> <br>`
    }
    if (dataAssistance.length !=0){
        document.getElementById("assistanceEstimateRP").innerHTML = `
        <h5 class="card-title d-inline mb-3">Assistance:</h5><br>
        <p id="assistance" class="card-text d-inline"> ${dataNueva[0].assistance}</p> <br>`
        
    }

    document.getElementById("priceRP").innerHTML = dataNueva[0].price
    document.getElementById("imagenRP").src=dataNueva[0].image


})