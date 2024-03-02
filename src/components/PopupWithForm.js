import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._form = this._popup.querySelector('.form');
      this._inputList = this._form.querySelectorAll('.form__input');
      this._submitButton = this._form.querySelector('.form__button');
    }
  
    _getInputValues() {
      const inputValues = {};
      this._inputList.forEach(input => {
        inputValues[input.name] = input.value;
      });
      return inputValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._submitButton.textContent = 'Guardando...'
        this._submitCallback(this._getInputValues()).finally(() => {
          this._submitButton.textContent = 'Guardar';
          this.close();
        });                
      });
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  }
