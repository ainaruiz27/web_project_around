/*export class Card{
    constructor(link,title,selector){
        this._link = link;
        this._title = title;
        this._selector;
    }
_getTemplate(){
const node = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
node.querySelector('card__image').src = this._link;
node.querySelector('.card__title').textContext = this._title;
return node;
}
_setEventListeners(){
    node.querySelector('.card__image').addEventListener('click',(event) =>{

    })
}
}

