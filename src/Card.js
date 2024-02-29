import { handleLikeIcon, handleDeleteCard } from "./utils/utils.js";
export default class Card {
  constructor
    (link,title,selector, handleCardClick, handleLike,
       handleRemoveLike, handleDeleteCard, 
       {_id, likes, owner,createAt}, user
       ) {
    this._link = link;
    this._title = title;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._createdAt = createAt;
    this._user = user;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__text');
    const likeButton = cardElement.querySelector(".card__like");    
    const counterNode = cardElement.querySelector(".card__counter");    
    const deleteButton = cardElement.querySelector(".card__trash-icon");
    title.textContent = this._title;
    image.src = this._link;
    image.alt = this._title;
    if(this.hasOwnerLike()){
      likeButton.classList.add('card__like_active');
    }
    counterNode.textContent = this._likes.length;
    if(this._owner._id !== this._user._id){
      deleteButton.style.display = 'none';
    }
    return cardElement;
  }
 
  
  _setEventListeners(node) {
    node.querySelector('.card__image').addEventListener('click', (event) => {
      this._handleCardClick(this._link, this._title);
    })

    const likeButton = node.querySelector(".card__like");
    const counterNode = node.querySelector(".card__counter");
    const deleteButton = node.querySelector(".card__trash-icon");

    likeButton.addEventListener('click', event => {
      if(this.hasOwnerLike()){
        this._handleRemoveLike(this._id).then((card) => {
          this._likes = card.likes;
          likeButton.classList.remove('card__like_active');
          counterNode.textContent = this._likes.length;
        })
      }else{
        this._handleLike(this._id).then((card) => {
          this._likes = card.likes;
          likeButton.classList.add('card__like_active');
          counterNode.textContent = this._likes.length;
        })
      }
    });
    deleteButton.addEventListener('click', event => {
      this._handleDeleteCard(this._id, node);
    })
  }

  hasOwnerLike() {
    return this._likes.some(like => like._id === this._user._id)
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(this._element);
    return this._element;
  }
}
