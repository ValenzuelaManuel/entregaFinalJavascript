// Cotizador para sitio de joyas artesanales

const carrito = []
const root = document.getElementById('root')
const seccionCarrito = document.getElementById('carrito')
const seccionTotal = document.getElementById('total')
const botonAnillo = ""
const botonAros = ""
const botonCollar = ""
const botonPulsera = ""

function ProtestSm(){}

function renderData(productos) {
    productos.forEach( p => {
        const listadoProductos = document.createElement('div')
        listadoProductos.innerHTML = 
        `<div class="p-2">
                <div class="card" style="width: 18rem;">
                    <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body">
                        ${p.nombre}: <strong>$${p.precio}</strong>
                        <button id="${p.id}">Agregar al carrito</button>
                    </div>
        </div>`
        root.append( listadoProductos )
    });
}

fetch( '/data/productos.json' )
    .then( res => res.json() )
    .then( data => {
        renderData(data)
        document.getElementById('1').addEventListener('click', clickHandler)
        document.getElementById('2').addEventListener('click', clickHandler)
        document.getElementById('3').addEventListener('click', clickHandler)
        document.getElementById('4').addEventListener('click', clickHandler)
    })

const listadoCarrito = document.createElement("div")
seccionCarrito.append (listadoCarrito)

let valorTotal = document.createElement("div")
seccionCarrito.append( valorTotal )
function clickHandler(event) {
    fetch("./data/productos.json")
    .then ((res) => res.json())
    .then ((data) => {
        let productos = data
        const productoElegido = productos.find((item) => item.id == event.target.id)
    carrito.push (productoElegido)
    const suma = carrito.reduce((acc,curr) => acc + curr.precio, 0)
    valorTotal.innerHTML = `<div class="container-fluid"><h3>Subtotal: $${suma}</h3></div>`
    const node = document.createElement("li");
    const textnode = document.createTextNode(`1x ${productoElegido.nombre}`);
    node.appendChild(textnode);
    listadoCarrito.appendChild(node)
    calcularPrecioFinal(suma);

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        position: 'right',
        gravity: 'top',  
    }).showToast();

});
}
localStorage.setItem('carrito', carrito)

const vaciarCarrito = document.createElement('div')
vaciarCarrito.innerHTML = `<div><button id="vaciarCarrito">Vaciar carrito</button></div>`
seccionCarrito.append( vaciarCarrito )

const botonVaciarCarrito = document.getElementById('vaciarCarrito')
botonVaciarCarrito.addEventListener('click', clickHandlerVaciar)

function clickHandlerVaciar() {
    carrito.splice(0,carrito.length)
    valorTotal.innerHTML = `<div><h3>Subtotal: $0</h3></div>`
    total.innerHTML =`<div><h3>Total: $0</h3></div>`
    listadoCarrito.innerHTML = ""

    Toastify({
        text: "El carrito ha sido vaciado",
        duration: 3000,
        position: 'right',
        gravity: 'top',  
    }).showToast();
}

const codigoDescuento = document.getElementById('codigoDescuento')

const total = document.createElement("div")
seccionTotal.append (total)

const calcularPrecioFinal = (suma) => {
if (codigoDescuento.value == "PRIMERACOMPRA15"){
    total.innerHTML = `<h3> TOTAL: $${suma*0.85}</h3>`
    Toastify({
        text: "Descuento aplicado exitosamente",
        duration: 3000,
        position: 'right',
        gravity: 'top',  
    }).showToast();
}else {
    total.innerHTML = `<h3> TOTAL: $${suma}</h3>`
}
}


