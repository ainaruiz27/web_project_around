import Card from "../Card.js";
import FormValidator from "../FormValidator.js";
import PopupWithImage from "../PopupWithImage.js";
import { initialCards, formConfig } from "./constants.js";
import Section from "../Section.js";
import UserInfo from "../UserInfo.js";
import PopupWithForm from "../PopupWithForm.js";
import { api } from "./Api.js";
import './index.css';


const formProfile = document.querySelector(".form.form_profile");
const btnSave = document.querySelector(".profile__info-editbutton");
const btnAddItem = document.querySelector(".profile__addbutton");
const inputName = document.querySelector("#name");
const inputProfession = document.querySelector("#profession");
const formUrl = document.querySelector(".form.form_place");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-work");
const popupObjImage = new PopupWithImage('#image-popup');
const popupObjProfile = new PopupWithForm('#profile__popup', handleProfileFormSubmit)
const popupObjAddCard = new PopupWithForm('#add__popup', handleAddFormSubmit)

popupObjImage.setEventListeners();
popupObjProfile.setEventListeners();
popupObjAddCard.setEventListeners();

let cardsSection = null;

api.getCards().then(cards => {
 cardsSection = new Section({items: cards, 
  renderer : function (item)  {
    const newCard = new Card(item.link, item.name, ".template-card" , {
      handleCardClick: (link, title) => {
        popupObjImage.open({src: link, alt: title});
      }
    });
    cardsSection.addItem(newCard.generateCard())
  }
}, '.elements');
cardsSection.render();
});


const userInfo = new UserInfo({nameSelector:profileName, jobSelector:profileJob});




function handleProfileFormSubmit({name, about}) {
  api.updateUserInfo().then(user => {
    userInfo.setUserInfo({name, job:about});
  })    
}

function handleAddFormSubmit({ title, link }) {
  const newCard = new Card(link, title, ".template-card", {
      handleCardClick: () => {
          popupObjImage.open({ src: link, alt: title });
      }
  });
  cardsSection.addItem(newCard.generateCard(), false);
}


btnSave.addEventListener("click", () => {
  popupObjProfile.open();
  inputName.value = profileName.textContent.trim();
  inputProfession.value = profileJob.textContent.trim();
});


btnAddItem.addEventListener("click", function () {
 popupObjAddCard.open();
});

const formValidatorProfile = new FormValidator(formConfig, formProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formConfig, formUrl);
formValidatorAddCard.enableValidation();

const tuIDdeGrupo = "web_es_11"; // Reemplaza con tu ID de grupo
const tuToken = "e261a8b3-b4ff-46a8-9ab6-ef7a9f75bcee"; // Reemplaza con tu token

//Construye la URL completa
const url = `https://around.nomoreparties.co/v1/${web_es_11}/cards`;

// Realiza la solicitud al servidor
fetch(url, {
  headers: {
    authorization: tuToken
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result);
})
.catch((error) => {
  console.error('Error al realizar la solicitud:', error);
});

// Reemplaza con tu ID de grupo y token
//const tuIDdeGrupo = "web_es_11";
//const tuToken = "e261a8b3-b4ff-46a8-9ab6-ef7a9f75bcee";

// Construye la URL completa para obtener la información del usuario
const urlUsuario = `https://around.nomoreparties.co/v1/${web_es_11}/users/me`;

// Realiza la solicitud GET al servidor
fetch(urlUsuario, {
  method: 'GET',
  headers: {
    authorization: tuToken
  }
})
.then(res => res.json())
.then((usuario) => {
  // Accede a las propiedades del objeto de usuario
  const nombreUsuario = usuario.name;
  const descripcionUsuario = usuario.about;
  const avatarUsuario = usuario.avatar;
  const idUsuario = usuario._id;

  // Utiliza la información del usuario como desees, por ejemplo, actualizando elementos en la página
  document.getElementById('profile__info-name').innerText = nombreUsuario;
  document.getElementById('profile__info-work').innerText = descripcionUsuario;
  document.getElementById('profile__avatar').src = avatarUsuario;

  // Puedes utilizar el ID del usuario (idUsuario) según tus necesidades
})
.catch((error) => {
  console.error('Error al obtener la información del usuario:', error);
});
