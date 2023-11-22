const profilepopupSelector = document.querySelector("#profile__popup");
const addPopupSelector = document.querySelector("#add__popup");
const popupCloseIcon = document.querySelector("#close-profile");
const btnSave = document.querySelector(".profile__info-editbutton");
const btnAddItem = document.querySelector(".profile__addbutton");
const inputName = document.querySelector("#name");
const inputProfession = document.querySelector("#profession");
const formElement = document.querySelector(".form");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-work");
const cardContainer = document.querySelector(".elements");
const addPopupCloseIcon = document.querySelector("#close-add");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#link");
const submitAddForm = document.querySelector("#form__addbutton");
const imagePopUp = document.querySelector("#image-popup");
const closeImageBtn = document.querySelector("#close-image");
const likeBtn = document.querySelector("#like-button");

closeImageBtn.addEventListener("click", () => {
  imagePopUp.style.display = "none";
});

function handleChangeVisibility(popupSelector) {
  popupSelector.classList.toggle("visible");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputProfession.value;
  handleChangeVisibility(addPopupSelector);
}

function handleChangeVisibility() {
  profilepopupSelector.classList.toggle("visible");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  inputTitle.textContent = inputTitle.value;
  inputLink.textContent = inputLink.value;
}

submitAddForm.addEventListener("submit", handleProfileFormSubmit);
btnSave.addEventListener("click", handleChangeVisibility);
popupCloseIcon.addEventListener("click", handleChangeVisibility);

btnAddItem.addEventListener("click", function () {
  handleChangeVisibility(addPopupSelector);
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

initialCards.forEach((card) => {
  getCardElement(card.name, card.link);
});

function createCard(name, link) {
  const newCard = document
    .querySelector(".template")
    .content.querySelector(".card")
    .cloneNode(true);
  newCard.querySelector(".card__text").textContent = name;
  newCard.querySelector(".elements__element").src = link;
  console.log(newCard);
}

function handleLikeIcon(evt) {
  evt.target.classList.toggle("button_like-active");
}

const getCardElement = (name, link) => {
  const cardElement = document
    .querySelector(".template")
    .content.querySelector(".card")
    .cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like");
  //const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".elements__element");

  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector(".card__text").textContent = name;

  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handlePreviewPicture(data));
  return cardElement;
};

newCard.addEventListener("click", () => {
  console.log("clik");
  imagePopUp.show();
});

cardContainer.append(newCard);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  console.log(inputTitle.value);
  createCard(inputTitle.value, inputLink.value);
}
submitAddForm.addEventListener("click", handleAddFormSubmit);
