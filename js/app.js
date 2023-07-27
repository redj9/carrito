const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarritos = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarritos = []; //reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el html
    } )
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    } 
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo articulosCarrito por el data-id
        articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId);

        carritoHTML()// Iterar sobre el carrito y mostrar en su html las actualizaciones
    }
}

//Lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarritos.map(curso =>{
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna objetos duplicados
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarritos = [...cursos]
    } else {
        //Agregamos el curso al carrito
        articulosCarritos = [...articulosCarritos, infoCurso];
    }

   //Agregar elementos al arreglo de carrito
 

   console.log(articulosCarritos);

   carritoHTML();
}


//Muestra el carrito de compras en el html
function carritoHTML() {

    //Limpiar el html
    limpiarHTML();

    //Recorre el carrito y genera el html
    articulosCarritos.forEach( curso => {
        const {imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>

        `;
        //Agrega el html del carrito en tbody
        contenedorCarrito.appendChild(row)
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = ''; 

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}