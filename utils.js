import { imagePopUp } from "./constants.js";

export function handleShowVisibility(popupSelector) {
  popupSelector.classList.add("visible");
  popupSelector.addEventListener("click", closeOnClick);

  document.addEventListener("keydown", handleEscapeKeyPress);
}

export function handleRemoveVisibility(popupSelector) {
  popupSelector.classList.remove("visible");
  document.removeEventListener("keydown", handleEscapeKeyPress);
}

export function closeOnClick(evt) {
  if (evt.target.classList.contains("overlay")) {
    handleRemoveVisibility(evt.currentTarget);
  }
}

export function handleEscapeKeyPress(evt) {
  if (evt.key === "Escape") {
    const visiblePopup = document.querySelector(".popup.visible");
    if (visiblePopup) {
      handleRemoveVisibility(visiblePopup);
    }
  }
}

export function handlePreviewPicture(link, name) {
  handleShowVisibility(imagePopUp);
  const image = document.querySelector(".popup__image");
  const title = document.querySelector(".popup__image-title");

  console.log(link, name);

  image.src = link;
  image.alt = name;

  title.textContent = name;
}

export function handleLikeIcon(evt) {
  console.log(evt.target);
  evt.target.classList.toggle("card__like_active");
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
}
