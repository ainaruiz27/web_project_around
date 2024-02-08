import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import { initialCards, formConfig } from "./constants.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
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

const cardsSection = new Section({items: initialCards, 
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
const userInfo = new UserInfo({nameSelector:profileName, jobSelector:profileJob});




function handleProfileFormSubmit({name, about}) {
    userInfo.setUserInfo({name, job:about});
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
