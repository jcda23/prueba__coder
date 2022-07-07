const formulario = document.getElementById("register-form");
const inputs = document.querySelectorAll("#register-form input");
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{3,5}$/, // 3 a 5 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};
const campos = {
  nombre: false,
  email: false,
  password: false,
  password2: false,
};
const addNewUser = [];

const validarRegistro = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarInput(expresiones.nombre, e.target, "nombre");
      break;
    case "email":
      validarInput(expresiones.email, e.target, "email");
      break;
    case "password":
      validarInput(expresiones.password, e.target, "password");
      validarPassword();
      break;
    case "password2":
      validarPassword();
      break;
  }
};

const validarInput = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`group__${campo}`).classList.remove(`is-invalid`);
    document.getElementById(`group__${campo}`).classList.add(`is-valid`);
    document
      .querySelector(`#group__${campo} i`)
      .classList.add(`fa-check-circle`);
    document
      .querySelector(`#group__${campo} i`)
      .classList.remove(`fa-times-circle`);
    document
      .querySelector(`#group__${campo} .formulario__input-error`)
      .classList.remove(`formulario__input-error-activo`);
    campos[campo] = true;
  } else {
    document.getElementById(`group__${campo}`).classList.add(`is-invalid`);
    document.getElementById(`group__${campo}`).classList.remove(`is-valid`);
    document
      .querySelector(`#group__${campo} i`)
      .classList.add(`fa-times-circle`);
    document
      .querySelector(`#group__${campo} i`)
      .classList.remove(`fa-check-circle`);
    document
      .querySelector(`#group__${campo} .formulario__input-error`)
      .classList.add(`formulario__input-error-activo`);
    campos[campo] = false;
  }
};

const validarPassword = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document.getElementById("group__password2").classList.add(`is-invalid`);
    document.getElementById("group__password2").classList.remove(`is-valid`);
    document
      .querySelector(`#group__password2 i`)
      .classList.add(`fa-times-circle`);
    document
      .querySelector(`#group__password2 i`)
      .classList.remove(`fa-check-circle`);
    document
      .querySelector(`#group__password2 .formulario__input-error`)
      .classList.add(`formulario__input-error-activo`);
    campos["password"] = false;
  } else {
    document.getElementById("group__password2").classList.remove(`is-invalid`);
    document.getElementById("group__password2").classList.add(`is-valid`);
    document
      .querySelector(`#group__password2 i`)
      .classList.remove(`fa-times-circle`);
    document
      .querySelector(`#group__password2 i`)
      .classList.add(`fa-check-circle`);
    document
      .querySelector(`#group__password2 .formulario__input-error`)
      .classList.remove(`formulario__input-error-activo`);
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarRegistro);
  input.addEventListener("blur", validarRegistro);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const terminos = document.getElementById("terminos");

  if (campos.nombre && campos.password && campos.email && terminos.checked) {
    crearUsuario();
    formulario.reset();
  } else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje")
        .classList.remove("formulario__mensaje-activo");
    }, 5000);
  }
});

function crearUsuario() {
  class User {
    constructor(nombre, email, password, password2) {
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.password2 = password2;
    }
  }
  let agregarNombre = document.getElementById("nombre").value;
  let agregarEmail = document.getElementById("email").value;
  let agregarPassword = document.getElementById("password").value;
  let agregarPassword2 = document.getElementById("password2").value;
  let newUser = new User(
    agregarNombre,
    agregarEmail,
    agregarPassword,
    agregarPassword2
  );
  addNewUser.push(newUser);
  localStorage.setItem("addNewUser", JSON.stringify(addNewUser));
  console.log(addNewUser);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Usuario creado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });
  document
    .getElementById("formulario__mensaje-exito")
    .classList.add("formulario__mensaje-exito-activo");
  setTimeout(() => {
    document
      .getElementById("formulario__mensaje-exito")
      .classList.remove("formulario__mensaje-exito-activo");
    window.location.href = "login.html";
  }, 2000);

  document.querySelectorAll(".is-valid").forEach((icono) => {
    icono.classList.remove("is-valid");
  });
}
