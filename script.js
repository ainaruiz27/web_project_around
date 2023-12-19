const popUp = document.querySelector(".popup");
const profilePopupSelector = document.querySelector("#profile__popup");
const formProfile = document.querySelector(".form.form__edit-profile");
const addPopupSelector = document.querySelector("#add__popup");
const popupCloseIcon = document.querySelector("#close-profile");
const btnSave = document.querySelector(".profile__info-editbutton");
const btnAddItem = document.querySelector(".profile__addbutton");
const inputName = document.querySelector("#name");
const inputProfession = document.querySelector("#profession");
const formUrl = document.querySelector(".form.form__edit-place");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-work");
const cardContainer = document.querySelector(".elements");
const addPopupCloseIcon = document.querySelector("#close-add");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#link");
const submitAddForm = document.querySelector("#form__addbutton");
const imagePopUp = document.querySelector("#image-popup");
const closeImageBtn = document.querySelector("#close-image");
const likeBtn = document.querySelector("#card__like");
const submitProfileForm = document.querySelector("#form__editbutton");

closeImageBtn.addEventListener("click", () => {
  handleRemoveVisibility(imagePopUp);
});

function handleShowVisibility(popupSelector) {
  popupSelector.classList.add("visible");
  popupSelector.addEventListener("click", closeOnClick);
  
  document.addEventListener('keydown', handleEscapeKeyPress);
}

function handleRemoveVisibility(popupSelector) {
  popupSelector.classList.remove("visible");
  document.removeEventListener('keydown', handleEscapeKeyPress);
}

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
    const newCard = getCardElement(inputTitle.value, inputLink.value);
    cardContainer.prepend(newCard);
    handleRemoveVisibility(addPopupSelector);
    inputTitle.value = "";
    inputLink.value = "";
  }
}


formProfile.addEventListener("submit", handleProfileFormSubmit);
formUrl.addEventListener("submit", handleAddFormSubmit);

btnSave.addEventListener("click", () => {
  handleShowVisibility(profilePopupSelector);
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

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function handlePreviewPicture(link, name) {
  handleShowVisibility(imagePopUp);
  const image = document.querySelector(".popup__image");
  const title = document.querySelector(".popup__image-title");

  console.log(link, name);

  image.src = link;
  image.alt = name;

  title.textContent = name;
}

function getCardElement(name, link) {
  const cardElement = document
    .querySelector(".template")
    .content.querySelector(".card")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like");
  const deleteButton = cardElement.querySelector(".card__trash-icon");
  const cardImage = cardElement.querySelector(".elements__element");

  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector(".card__text").textContent = name;
  function handleDeleteCard() {
    cardElement.remove();
  }
  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handlePreviewPicture(link, name));
  return cardElement;
}

initialCards.forEach((card) => {
  const newCard = getCardElement(card.name, card.link);
  cardContainer.append(newCard);
});

function handleLikeIcon(evt) {
  console.log(evt.target);
  evt.target.classList.toggle("card__like_active");
}

function handleEscapeKeyPress(evt) {
  if (evt.key === "Escape") {
    handleRemoveVisibility(addPopupSelector);
    handleRemoveVisibility(profilePopupSelector);
    handleRemoveVisibility(imagePopUp);
  }
}

function closeOnClick(evt) {
  if (evt.target.classList.contains('overlay')) {
    addPopupSelector.classList.remove('visible');
    profilePopupSelector.classList.remove('visible');
    imagePopUp.classList.remove('visible');
  }
}
