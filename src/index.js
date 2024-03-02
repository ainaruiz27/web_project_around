import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { initialCards, formConfig, avatarNode, buttonAvatar } from "./utils/constants.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import { api } from "./utils/Api.js";
import './page/index.css';
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";

console.log(buttonAvatar);

const formProfile = document.querySelector(".form.form_profile");
const btnSave = document.querySelector(".profile__info-editbutton");
const btnAddItem = document.querySelector(".profile__addbutton");
const inputName = document.querySelector("#name");
const inputProfession = document.querySelector("#profession");
const formUrl = document.querySelector(".form.form_place");
const formAvatar = document.querySelector(".form_edit-avatar");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-work");
const popupObjImage = new PopupWithImage('#image-popup');
const popupObjProfile = new PopupWithForm('#profile__popup', handleProfileFormSubmit)
const popupObjAddCard = new PopupWithForm('#add__popup', handleAddFormSubmit);
const userInfo = new UserInfo({ nameSelector: profileName, jobSelector: profileJob, avatarSelector: avatarNode });
const popupWithConfirmation = new PopupWithConfirmation('#confirmation-popup');
const popupAvatar = new PopupWithForm('#edit-avatar-popup', handleAvatarFormSubmit );

popupObjImage.setEventListeners();
popupObjProfile.setEventListeners();
popupObjAddCard.setEventListeners();
popupWithConfirmation.setEventListeners();
popupAvatar.setEventListeners();

let cardsSection = null;

let user = null;

api.getUserInfo().then(dataUser => {
  user = dataUser;
  userInfo.setUserInfo({
    name: dataUser.name,
    job: dataUser.about
  })
  userInfo.setAvatar(dataUser.avatar)
  api.getCards().then(cards => {
    cardsSection = new Section({
      items: cards,
      renderer: function (item) {
        const newCard = new Card(item.link, item.name, ".template-card",
          (link, title) => {
            popupObjImage.open({ src: link, alt: title });
          }
          ,
          /* handleLike */
          (cardId) => {
            return api.addLike(cardId)
          },
          /* handleRemoveLike */
          (cardId) => {
            return api.removeLike(cardId)
          },
          /* handleDeleteCard */
          (cardId, cardNode) => {
            console.log('borrar')
            popupWithConfirmation.open(              
              () => {
                api.deleteCard(cardId).then(() => {
                  cardNode.remove();
                });
              }
            );          
          },
          item,
          user);
        cardsSection.addItem(newCard.generateCard())
      }
    }, '.elements');
    cardsSection.render();
  });
})

function handleProfileFormSubmit({ name, about }) {
  return api.updateUser({about, name}).then(user => {
    userInfo.setUserInfo({ name, job: about });
  })
}

function handleAddFormSubmit({ title, link }) {
  return api.addCard(link, title).then(card => {
    const newCard = new Card(link, title, ".template-card",
      (link, title) => {
        popupObjImage.open({ src: link, alt: title });
      },
      /* handleLike */
      (cardId) => {
        return api.addLike(cardId)
      },
      
      (cardId) => {
        return api.removeLike(cardId)
      },
    
      (cardId) => {

        return api.deleteCard(cardId);
      },
      card,
      user
    );
    cardsSection.addItem(newCard.generateCard(), false);
  })
}

function handleAvatarFormSubmit({newAvatarLink}) {
  return api.updateUser({avatar: newAvatarLink}).then(() => {
    userInfo.setAvatar(newAvatarLink);    
  })
}

btnSave.addEventListener("click", () => {
  popupObjProfile.open();
  inputName.value = profileName.textContent.trim();
  inputProfession.value = profileJob.textContent.trim();
});


btnAddItem.addEventListener("click", function () {
  popupObjAddCard.open();
});


buttonAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

const formValidatorProfile = new FormValidator(formConfig, formProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(formConfig, formUrl);
formValidatorAddCard.enableValidation();

const formValidatorAvatar = new FormValidator(formConfig, formAvatar);
formValidatorAvatar.enableValidation();
