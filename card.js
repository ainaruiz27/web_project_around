import { handlePreviewPicture, handleLikeIcon, handleDeleteCard } from "./utils.js";
export default class Card{
  constructor(link, title, selector ){
      this._link = link;
      this._title = title;
      this._selector = selector;
  }

  _getTemplate(){
    console.log(this._selector);
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    const title = cardElement.querySelector('.card__text');
    title.textContent = this._title;
    image.src = this._link;
    return cardElement;
  }
  _setEventListeners(node){
      node.querySelector('.card__image').addEventListener('click',(event) =>{
        handlePreviewPicture(this._link, this._title);
      })

    const likeButton = node.querySelector(".card__like");
    const deleteButton = node.querySelector(".card__trash-icon");

    likeButton.addEventListener('click', handleLikeIcon);
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
/*
const initialCards = [
  {
    name: 'Valle de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg',
  },
 
];

const cardContainer = document.querySelector('.elements');
const cardTemplateSelector = '.template';

initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector);
  const cardElement = card.generateCard();
  cardContainer.append(cardElement);
});
*/