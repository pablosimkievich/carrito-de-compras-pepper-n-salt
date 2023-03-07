const clickButton = document.querySelectorAll('.button');
// console.log(clickButton)
const tbody = document.querySelector('.tbody')
let carrito = []

// localStorage.clear()

clickButton.forEach( (btn) => {
    btn.addEventListener('click', addCarritoItem)
});

function addCarritoItem (e) {
    const button = e.target
    // console.log(button)
    const item = button.closest('.card')
    
    const itemTitle = item.querySelector('.card-text').textContent
    // console.log(itemTitle)
    const itemPrice = item.querySelector('.precio').textContent
    // console.log(itemPrice)
    const itemImg = item.querySelector('.card-img-top').src
    // console.log(itemImg)
    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        quantity: 1
    }
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    const inputElemento = tbody.getElementsByClassName('input__elemento');

    for ( i= 0; i < carrito.length; i++) {
        if(carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].quantity++;
            const inputValue = inputElemento[i]
            inputValue.value++; 
            CarritoTotal()
            return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito () {
    tbody.innerHTML = ''
    console.log(carrito)
    carrito.map (item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
            <th scope="row"></th>
            <td class="table__productos">
            <img src=${item.img}  alt="">
            <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.price}</p></td>
            <td class="table__cantidad">
            <input type="number" min="1" value=${item.quantity} class="input__elemento">
            <button class="delete btn btn-danger">x</button>
            </td>
        `
        tr.innerHTML = Content
        tbody.append(tr)

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal= document.querySelector('.itemCartTotal');
    carrito.forEach( item => {
        const precio =  Number(item.price.replace("$", ''))
        Total  = Total + precio * item.quantity
    })

    itemCartTotal.innerHTML = `Total $ ${ Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest('.ItemCarrito')
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i < carrito.length ; i++){

        if(carrito[i].title.trim() === title.trim()){
          carrito.splice(i, 1);
        }
      }
    
      const alert = document.querySelector('.remove')
    
      setTimeout( function(){
        alert.classList.add('remove')
      }, 1000)
        alert.classList.remove('remove')
    
      tr.remove()
      CarritoTotal()
}

function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
      if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.quantity = sumaInput.value;
        CarritoTotal()
      }
    })
  }
  
  function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
  } 