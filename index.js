import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  closeOnClick,
  handleEscapeKeyPress,
  handleRemoveVisibility,
  handleShowVisibility,
} from "./utils.js"
import { initialCards, imagePopUp, formConfig } from "./constants.js";

const cardsArea = document.querySelector(".elements");
const popUp = document.querySelector(".popup");
const profilePopupSelector = document.querySelector("#profile__popup");
const formProfile = document.querySelector(".form.form_profile");
const addPopupSelector = document.querySelector("#add__popup");
const popupCloseIcon = document.querySelector("#close-profile");
const btnSave = document.querySelector(".profile__info-editbutton");
const btnAddItem = document.querySelector(".profile__addbutton");
const inputName = document.querySelector("#name");
const inputProfession = document.querySelector("#profession");
const formUrl = document.querySelector(".form.form_place");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-work");
const cardContainer = document.querySelector(".elements");
const addPopupCloseIcon = document.querySelector("#close-add");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#link");
const submitAddForm = document.querySelector("#form__addbutton");
const closeImageBtn = document.querySelector("#close-image");
const likeBtn = document.querySelector("#card__like");
const submitProfileForm = document.querySelector("#form__editbutton");

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, ".template-card");

  cardsArea.append(card.generateCard());
});

closeImageBtn.addEventListener("click", () => {
  handleRemoveVisibility(imagePopUp);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  if (inputName.validity.valid && inputProfession.validity.valid) {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputProfession.value;
    handleRemoveVisibility(profilePopupSelector);
    inputName.value = "";
    inputProfession.value = "";
  }
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  if (inputTitle.validity.valid && inputLink.validity.valid) {
    const newCard = new Card( inputLink.value, inputTitle.value,  ".template-card");
    cardContainer.prepend(newCard.generateCard());
    handleRemoveVisibility(addPopupSelector);
    inputTitle.value = "";
    inputLink.value = "";
  }
}

formProfile.addEventListener("submit", handleProfileFormSubmit);
formUrl.addEventListener("submit", handleAddFormSubmit);

btnSave.addEventListener("click", () => {
  handleShowVisibility(profilePopupSelector);
  inputName.value = profileName.textContent.trim();
  inputProfession.value = profileJob.textContent.trim();
});

popupCloseIcon.addEventListener("click", function () {
  handleRemoveVisibility(profilePopupSelector);
});

btnAddItem.addEventListener("click", function () {
  handleShowVisibility(addPopupSelector);
});

addPopupCloseIcon.addEventListener("click", function () {
  addPopupSelector.classList.remove("visible");
});

const formValidatorProfile = new FormValidator(formConfig, formProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formConfig, formUrl);
formValidatorAddCard.enableValidation();
