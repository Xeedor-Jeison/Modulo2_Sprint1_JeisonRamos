let url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
    .then(response => response.json())
    .then(data => {

        let carrusel = document.getElementById("carouselPrincipal")

        let eventsPast = filtrarFechas(data.events, data.currentDate, false)

        crearTarjetas(eventsPast, carrusel)


        function crearTarjetas(array, divPrincipal) {
            divPrincipal.innerHTML = ""
            for (let i = 0; i < array.length; i += 4) {
                let carruselItem
                if (i < 4) {
                    carruselItem = document.createElement("div")
                    carruselItem.classList.add("carousel-item", "active")
                }
                else {
                    carruselItem = document.createElement("div")
                    carruselItem.classList.add("carousel-item")
                }

                let contenedor = document.createElement("div")
                contenedor.classList.add("row")
                for (let j = i; j < i + 4; j++) {

                    if (array[j] != undefined) {
                        let card = document.createElement("div")
                        card.classList.add("col-sm-3", "col-md-6", "col-xxl-3")
                        card.innerHTML = `<div
                class="card tamañoCard mb-5  ms-2 me-2 shadow-lg bg-body-black rounded border  border-black border-opacity-10 border-5">
                <img src="${array[j].image}"
                    class="card-img-top  img-card border border-black border-opacity-10 border-4  "
                    alt="Festival the collectivities">
                <div class="card-body">
                    <h5 class="card-title mb-3">${array[j].name}</h5>
                    <p class="card-text mb-4 altura">${array[j].description}</p>
                    <div class="d-flex justify-content-around align-items-center  ">
                        <h5 class="d-inline-block ">Price: ${array[j].price}</h5>
                        <a href="./details.html?id=${array[j]._id}&estimate=${array[j].estimate}&assistance=${array[j].assistance}" class="btn btn-primary search">Details</a>
                    </div>
                </div>
            </div>`
                        contenedor.appendChild(card)
                    }

                }

                carruselItem.appendChild(contenedor)
                divPrincipal.appendChild(carruselItem)

            }
        }

        function filtrarFechas(array, dates, future) {
            let nuevoArreglo = []
            for (let i = 0; i < array.length; i++) {
                if (future == true) {
                    if (array[i].date > dates) {
                        nuevoArreglo.push(array[i])
                    }

                } else {
                    if (array[i].date < dates) {
                        nuevoArreglo.push(array[i])
                    }

                }
            }
            return nuevoArreglo
        }

        let divCheckbox = document.getElementById("divCheckbox")

        let arrayCategory = Array.from(new Set(eventsPast.map(event => event.category)))

        divCheckbox.addEventListener("change", e => {
            let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())
            let search = document.getElementById("inputBusquedad").value


            let newArray;

            if (checked.length === 0) {
                newArray = eventsPast
            } else {
                newArray = filterCheckbox(eventsPast, checked)
                newArray = FitlerText(newArray, search)

            }
            crearTarjetas(newArray, carrusel)
        })


        crearCheckbox(arrayCategory)

        function crearCheckbox(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] != undefined) {
                    let checkbox = document.createElement("div")
                    checkbox.classList.add("form-check", "form-check-inline")
                    checkbox.innerHTML = `
                <input class="form-check-input border border-primary" type="checkbox" value= "${array[i]}" id="${array[i]}"
                value="foodFair">
                <label class="form-check-label" for="${array[i]}">${array[i]}</label>`
                    divCheckbox.appendChild(checkbox)
                }

            }

        }

        function filterCheckbox(array, arrayFilter) {
            let newArray = array.filter(event => arrayFilter.includes(event.category.toLowerCase()))
            return newArray

        }


        let search = document.getElementById("inputBusquedad")
        search.addEventListener("keyup", e => {
            let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())

            let newArray = filterCheckbox(eventsPast, checked)

            let nuevoArregloBuscar = FitlerText(newArray, e.target.value)

            let buscador = FitlerText(eventsPast, e.target.value)

            if (newArray == 0) {
                if (buscador.length == 0) {
                    carrusel.innerHTML = `
            <div class="carousel-item active tamañoCard d-flex justify-content-center align-items-center "> 
            <div class= "bg-primary text-white rounded-5 p-3 ps-5 pe-5 m-3 opacity-bg"><h2 class="display-5 fw-bold  fst-italic text-center">No hay eventos disponibles para esta categoria seleccionada</h2></div>

            </div>`
                }
                else {

                    crearTarjetas(buscador, carrusel)
                }
            }

            if (newArray != 0) {
                if (nuevoArregloBuscar.length == 0) {
                    carrusel.innerHTML = `
            <div class="carousel-item active tamañoCard d-flex justify-content-center align-items-center "> 
            <div class= "bg-primary text-white rounded-5 p-3 ps-5 pe-5 m-3 opacity-bg"><h2 class="display-5 fw-bold  fst-italic text-center">No hay eventos disponibles para esta categoria seleccionada</h2></div>

            </div>`


                }
                else { crearTarjetas(nuevoArregloBuscar, carrusel) }
            }




        })
        function FitlerText(array, search) {
            let newArray = array.filter(evento => evento.name.toLowerCase().includes(search) || evento.description.toLowerCase().includes(search))
            return newArray
        }


    })



