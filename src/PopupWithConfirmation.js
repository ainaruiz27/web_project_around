import Popup from "./Popup.js";
  

 export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
      super(popupSelector);
     
      this._confirmButton = this._popup.querySelector('.popup__confirm-button');
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._confirmButton.addEventListener('click', () => {
        this._handleConfirm();
        this.close();
      });
    }
  
    open(handleConfirm) {
      super.open();
      this._handleConfirm = handleConfirm;
    }
  }
  
