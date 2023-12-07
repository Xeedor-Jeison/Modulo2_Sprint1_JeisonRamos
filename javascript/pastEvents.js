import * as misFunciones from "../modulos/funciones.js"
import * as misVariables from "../modulos/variables.js"


fetch(misVariables.url)
    .then(response => response.json())
    .then(data => {

        let eventsPast = misFunciones.filtrarFechas(data.events, data.currentDate, false)

        misFunciones.crearTarjetas(eventsPast, misVariables.carrusel)

        let arrayCategory = Array.from(new Set(eventsPast.map(event => event.category)))

        misVariables.divCheckbox.addEventListener("change", e => {
            let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())

            let newArray;

            if (checked.length === 0) {
                newArray = eventsPast
            } else {
                newArray = misFunciones.filterCheckbox(eventsPast, checked)
                newArray = misFunciones.FitlerText(newArray, misVariables.search.value)

            }
            misFunciones.crearTarjetas(newArray, misVariables.carrusel)
        })

        misFunciones.crearCheckbox(arrayCategory)

        misVariables.search.addEventListener("keyup", e => {
            let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())

            let newArray = misFunciones.filterCheckbox(eventsPast, checked)

            let nuevoArregloBuscar = misFunciones.FitlerText(newArray, e.target.value)

            let buscador = misFunciones.FitlerText(eventsPast, e.target.value)

            if (newArray == 0) {
                if (buscador.length == 0) {
                    misVariables.carrusel.innerHTML = `
            <div class="carousel-item active tamañoCard d-flex justify-content-center align-items-center "> 
            <div class= "bg-primary text-white rounded-5 p-3 ps-5 pe-5 m-3 opacity-bg"><h2 class="display-5 fw-bold  fst-italic text-center">No hay eventos disponibles para esta categoria seleccionada</h2></div>

            </div>`
                }
                else {

                    misFunciones.crearTarjetas(buscador, misVariables.carrusel)
                }
            }

            if (newArray != 0) {
                if (nuevoArregloBuscar.length == 0) {
                    misVariables.carrusel.innerHTML = `
            <div class="carousel-item active tamañoCard d-flex justify-content-center align-items-center "> 
            <div class= "bg-primary text-white rounded-5 p-3 ps-5 pe-5 m-3 opacity-bg"><h2 class="display-5 fw-bold  fst-italic text-center">No hay eventos disponibles para esta categoria seleccionada</h2></div>

            </div>`


                }
                else { misFunciones.crearTarjetas(nuevoArregloBuscar, misVariables.carrusel) }
            }

        })

    })



