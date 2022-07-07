const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template__footer").content;
const templateCar = document.getElementById("template__car").content;
const templateCard = document.getElementById("template__card").content;
const nItemsCar = document.getElementById("buy__car");
const fragment = document.createDocumentFragment();
let buyCar = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
cards.addEventListener("click", (e) => {
  selectProduct(e);
});

let data;
const fetchData = async () => {
  try {
    const response = await fetch("api.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const stockProductos = (data) => {
  data.forEach((producto) => {
    templateCard.getElementById("title__card").textContent = producto.title;
    templateCard.querySelector("h6").textContent = producto.id;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard
      .querySelector("img")
      .setAttribute("src", producto.thumbnailUrl);
    //botones
    templateCard.querySelector(".btn").dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

function searchFilters(input, selector) {
  document.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      if (e.key === "Escape") e.target.value = "";
      document.querySelectorAll(selector).forEach((item) => {
        item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ? (item.style.display = "block")
          : (item.style.display = "none");
      });
    }
  });
}

const selectProduct = (e) => {
  if (e.target.classList.contains("btn-buy")) {
    addCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

export const addCarrito = (object) => {
  const product = {
    id: object.querySelector(".btn-buy").dataset.id,
    title: object.querySelector(".title__card").textContent,
    precio: object.querySelector(".price__card").textContent,
    img: object.querySelector(".card-img-top").src,
    cantidad: 1,
  };
  if (buyCar.hasOwnProperty(product.id)) {
    product.cantidad = buyCar[product.id].cantidad + 1;
  }
  //spread operator
  buyCar[product.id] = { ...product }; //Necesito enviar este valor a otro archivo js "buyCar.js" para poder usarlo como parametro en la funcion que pinta los objetos del carrito en el doom "printCar"
  printCar();
};

// Con esta funcion pinto los productos en el carrito
// pero no he podido hacerla funcionar desde un modulo de js a parte
const printCar = () => {
  /*  console.log(buyCar); */
  items.innerHTML = "";
  Object.values(buyCar).forEach((product) => {
    templateCar.querySelector("th").textContent = product.id;
    //aca quisiera pintar la imagen de cada producto en el carrito pero me genera error
    //al pasarla por atributo

    /*     templateCar
      .querySelector("td")[0]
      .setAttribute("src", product.thumbnailUrl); */
    templateCar.querySelectorAll("td")[0].textContent = product.title;
    templateCar.querySelectorAll("td")[1].textContent = product.cantidad;
    templateCar.querySelector("span").textContent =
      product.cantidad * product.precio;

    //botones
    templateCar.querySelector(".btn-info").dataset.id = product.id;
    templateCar.querySelector(".btn-danger").dataset.id = product.id;
    const clone = templateCar.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  printFooter();
};

const printFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(buyCar).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío</th>`;
  }
  const nCantidad = Object.values(buyCar).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  console.log(nCantidad);
  nItemsCar.innerHTML = `<a href="#table"><i class="fa fa-shopping-cart" aria-hidden="true"><span class="navbar__car badge badge-pill badge-danger">${nCantidad}</span>`;
};

async function main() {
  data = await fetchData();
  ventanaModal(
    `<img src="./assets/img/picture1.svg" class="modal__img">`,
    `<h2 class="modal__title">Bienvenidos a mi tienda<span class="modal__title modal__title--bold"> Registrate!</span>
      </h2>`,
    `<p class="modal__paragraph">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ea perferendis
        officiis?
      </p>`,
    `<a id="modal__close" class="modal__close" href="./assets/pages/registro.html">Registrate</a>`
  );
  stockProductos(data);
  searchFilters(".search-bar", ".card");
}
main();
