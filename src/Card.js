import { handleLikeIcon, handleDeleteCard } from "./utils/utils.js";
export default class Card {
  constructor
    (link,title,selector, handleCardClick, handleLike,
       handleRemoveLike, handleDeleteCard, {
      handleCardClick
      }) {
    this._link = link;
    this._title = title;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__text');
    title.textContent = this._title;
    image.src = this._link;
    image.alt = this._title;
    return cardElement;
  }
  _setEventListeners(node) {
    node.querySelector('.card__image').addEventListener('click', (event) => {
      this._handleCardClick(this._link, this._title);
    })

    const likeButton = node.querySelector(".card__like");
    const deleteButton = node.querySelector(".card__trash-icon");

    likeButton.addEventListener('click', event => {
      handleLikeIcon(node);
    });
    deleteButton.addEventListener('click', event => {
      handleDeleteCard(node);
    })
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);
    return this._element;
  }
}
