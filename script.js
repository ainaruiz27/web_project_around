const popupSelector = document.querySelector('.popup');
const popupCloseIcon = document.querySelector('#close-profile');
const btnSave = document.querySelector('.profile__info-editbutton');
const inputName = document.querySelector('#name');
const inputProfession = document.querySelector('#profession');
const formElement = document.querySelector('.form');
const profileName = document.querySelector('.profile_name');

function handleChangeVisibility(){
    popupSelector.classList.toggle('visible');
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
}

formElement.addEventListener('submit', handleProfileFormSubmit);
btnSave.addEventListener('click', handleChangeVisibility);
popupCloseIcon.addEventListener('click', handleChangeVisibility);