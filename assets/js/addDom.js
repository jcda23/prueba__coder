///FUNCION REUTILIZABLE, ME TOCA IMPLEMENTARLA PARA AGREGAR TODOS LOS ELEMENTOS DEL DOM A TRAVES DE ELLA
//Añadimos los atributos al elemento
const addAttributes = (element, attrObject) => {
  for (let attr in attrObject) {
    if (attrObject.hasOwnProperty(attr)) {
      element.setAttribute(attr, attrObject[attr]);
    }
  }
};

//Recibimos un elemento y un objeto con atributos y sus hijos
const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  if (children !== undefined)
    children.forEach((child) => {
      if (child.nodeType) {
        if (child.nodeType === 1 || child.nodeType === 11)
          customElement.appendChild(child);
      } else {
        customElement.innerHTML += child;
      }
    });
  addAttributes(customElement, attributes);
  return customElement;
};

const ventanaModal = (img, title, text, enlace) => {
  const modalClose = createCustomElement(
      "div",
      {
        class: "modal__close",
        id: "modal__close",
      },
      [enlace]
    ),
    modalParagraph = createCustomElement(
      "div",
      {
        class: "modal__paragraph",
        id: "modal__paragraph",
      },
      [text]
    ),
    modalTitle = createCustomElement(
      "div",
      {
        class: "modal__title",
        id: "modal__title",
      },
      [title]
    ),
    modalFigure = createCustomElement(
      "figure",
      {
        id: "modal__picture",
        class: "modal__picture",
      },
      [img]
    ),
    modalContainer = createCustomElement(
      "div",
      {
        id: "modal__container",
        class: "modal__container",
      },
      [modalFigure, modalTitle, modalParagraph, modalClose]
    ),
    modal = createCustomElement(
      "section",
      {
        id: "modal",
        class: "modal",
      },
      [modalContainer]
    );
  //Despliega la ventana modal
  document.body.appendChild(modal);

  const closeModal = () => {
    /*     document.body.removeChild(modal); */
    document.getElementById("modal").classList.add("is-active");
    document.getElementById("modal__container").classList.add("is-active");
    document.getElementById("modal__picture").classList.add("is-active");
  };
  //Añadimos el evento para cerrar la ventana modal
  modalContainer.addEventListener("click", (e) => {
    if (e.target.id === "modal__container") {
      closeModal();
    }
  });
};
