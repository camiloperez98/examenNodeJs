const url = 'http://localhost:8082/api/colegio'
const listarColegios = async () => {
    let body = document.getElementById('listaColegios')
    if (body) {
        let mensaje = ''
        fetch(url) //metodo para llamar la API
            .then(res => res.json())
            .then(function (data) {
                let listarColegios = data.colegios
                listarColegios.map((colegio) => {
                    mensaje += `<tr><td>${colegio.direccion}</td>` +
                        `<td>${colegio.latitud}</td>` +
                        `<td>${colegio.longitud}</td>` +
                        `<td>${colegio.descripcion}</td>` +
                        `<td>${colegio.fecha}</td>` +
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editarColegio(${JSON.stringify(colegio)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminarColegio("${colegio._id}")'>Eliminar</a>
                </td></tr>`
                    body.innerHTML = mensaje
                })
            })
    }

}

listarColegios()

const registrarColegio = async () =>{
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value

    let colegio = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(colegio),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })

    .then(response => response.json())
    .then(json =>{
        alert(json.mensaje)
    })
}

const editarColegio = (colegio) =>{
    document.getElementById('_id').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('descripcion').value = ''

    document.getElementById('_id').value = colegio._id
    document.getElementById('direccion').value = colegio.direccion
    document.getElementById('latitud').value = colegio.latitud
    document.getElementById('longitud').value = colegio.longitud
    document.getElementById('descripcion').value = colegio.descripcion

}

const actualizarColegio = async () =>{
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitus').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value


    let colegio = {
        _id: document.getElementById('_id').value,
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
        tipoModificacion: 'Unitaria'
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(colegio),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })

    .then(response => response.json())
    .then(json =>{
        alert(json.mensaje)
    })
}

const eliminarColegio = (_id) =>{
    if(confirm('¿Desea realizar la eliminación?') == true){

        let colegio = {
            _id: _id
        }
        fetch(url, {
            method:'DELETE',
            mode: 'cors',
            body:JSON.stringify(colegio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

        .then(response => response.json())
        .then(json =>{
            alert(json.mensaje)
        })
    }
}

if(document.querySelector('#btn-registrarColegio')){
    document.querySelector('#btn-registrarColegio')
    .addEventListener('click', registrarColegio)
}

if(document.querySelector('#btn-actualizarColegio')){
    document.querySelector('#btn-actualizarColegio')
    .addEventListener('click', actualizarColegio)
}
