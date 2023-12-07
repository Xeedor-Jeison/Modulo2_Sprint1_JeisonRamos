import * as misFunciones from "../modulos/funciones.js"
import * as misVariables from "../modulos/variables.js"


fetch(misVariables.url)
  .then(response => response.json())
  .then(data => {

    let crearTr = document.getElementById("crearTr")
    let PrimerTr = document.createElement("tr")
    PrimerTr.innerHTML = `<th class="bg-secondary" colspan="3">Events Statistics</th>`

    crearTr.appendChild(PrimerTr)

    let resultadoOperacionAsistenciaMayores = []
    let resultadoOperacionAsistenciaMenores = []

    let asistencia = data.events.filter(events => events.assistance)

    for (let i = 0; i < asistencia.length; i++) {
      let diezPorciento = (100 / 100) * asistencia[i].capacity
      let resultadoOperacion = Math.floor((Number((asistencia[i].assistance / diezPorciento) * 100)))

      if (resultadoOperacion > 90) {
        resultadoOperacionAsistenciaMayores.push({
          nombre: asistencia[i].name,
          categorias: asistencia[i].category,
          asistencia: resultadoOperacion,
          capacidad: asistencia[i].capacity
        })
      }
      if (resultadoOperacion <90) {
        resultadoOperacionAsistenciaMenores.push({
          nombre: asistencia[i].name,
          categorias: asistencia[i].category,
          asistencia: resultadoOperacion,
          capacidad: asistencia[i].capacity
        })
        
      }

    }

    for (let i = 0; i < resultadoOperacionAsistenciaMayores.length; i++) {

      let primerTr = document.createElement("tr")
      primerTr.innerHTML = `
  <td class="col-4">El evento <b>${resultadoOperacionAsistenciaMayores[i].nombre}</b> tuvo una asistencia de  <b>${resultadoOperacionAsistenciaMayores[i].asistencia}%</b></td>
  <td class="col-4">El evento <b>${resultadoOperacionAsistenciaMenores[i].nombre}</b> tuvo una asistencia de  <b>${resultadoOperacionAsistenciaMenores[i].asistencia}%</b></td>
  <td class="col-4">El evento <b>${resultadoOperacionAsistenciaMayores[i].nombre}</b> tiene una capacidad de <b>${resultadoOperacionAsistenciaMayores[i].capacidad}</b></td>`

      crearTr.appendChild(primerTr)
    }



    let nuevoTr = document.createElement("tr")
    nuevoTr.innerHTML = `<th class="bg-secondary" colspan="3">Upcoming events statistics by category</th>`

    crearTr.appendChild(nuevoTr)

    let eventsFuture = misFunciones.filtrarFechas(data.events, data.currentDate, true)

    let categoriesEventsFuture = []
    let ingresosEventsFuture = []

    for (let i = 0; i < eventsFuture.length; i++) {

      categoriesEventsFuture.push({
        nombre: eventsFuture[i].name,
        categorias: eventsFuture[i].category
      })

      ingresosEventsFuture.push({
        nombre: eventsFuture[i].name,
        ingresos: eventsFuture[i].price * eventsFuture[i].capacity
      })

    }

    for (let i = 0; i < categoriesEventsFuture.length; i++) {


      let nuevoTr = document.createElement("tr")
      nuevoTr.innerHTML = `
  <td class="col-4">Los categorias de los eventos futuros son <b>${categoriesEventsFuture[i].categorias}</b></td>
  <td class="col-4">Los ingresos estimados para esta categoria es de <b>$${ingresosEventsFuture[i].ingresos}</b></td>
  <td class="col-4">Con una asistencia del <b>100%</b></td>`

      crearTr.appendChild(nuevoTr)
    }

    let nuevoTrPast = document.createElement("tr")
    nuevoTrPast.innerHTML = `<th class="bg-secondary" colspan="3">Past Events statistics by category</th>`

    crearTr.appendChild(nuevoTrPast)

    let eventsPast = misFunciones.filtrarFechas(data.events, data.currentDate, false)


    let categoriesEventsPast = []
    let ingresosEventsPast = []
    let resultadoOperacionPast = []

    for (let i = 0; i < eventsPast.length; i++) {
      let diezPorciento = (100 / 100) * eventsPast[i].capacity
      let resultadoOperacion = Math.floor((Number((eventsPast[i].assistance / diezPorciento) * 100)))

      resultadoOperacionPast.push(resultadoOperacion)

      categoriesEventsPast.push({
        nombre: eventsPast[i].name,
        categorias: eventsPast[i].category
      })

      ingresosEventsPast.push({
        nombre: eventsPast[i].name,
        ingresos: eventsPast[i].price * eventsPast[i].assistance
      })

    }

    for (let i = 0; i < categoriesEventsPast.length; i++) {


      let nuevoTr = document.createElement("tr")
      nuevoTr.innerHTML = `
  <td class="col-4">Los categorias de los eventos pasados fueron <b>${categoriesEventsPast[i].categorias}</b></td>
  <td class="col-4">Los ingresos estimados para esta categoria es de <b>$${ingresosEventsPast[i].ingresos}</b></td>
  <td class="col-4">Este evento tuvo una asistencia del <b>${resultadoOperacionPast[i]}%</b></td>`

      crearTr.appendChild(nuevoTr)
    }

    


  })

