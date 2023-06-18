const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

// Profile
const buttonEditProfileOpen = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');
// Show cards
const cardTemplateSelector = '#cards-template';
const cardListSelector = '.places__cards';
// Open popupAdd
const buttonAddCardOpen = document.querySelector('.profile__button_type_add');
const popupAddCard = document.querySelector('.popup_type_add');
// Add cards
const formCard = popupAddCard.querySelector('.popup__form');
const titleInput = formCard.querySelector('.popup__input_type_name');
const linkInput = formCard.querySelector('.popup__input_type_activity');
// change Avatar
const buttonChangeAvatar = document.querySelector('.profile__button_type_avatar');
const popupChangeAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupChangeAvatar.querySelector('.popup__form');
const avatarLink = formAvatar.querySelector('.popup__input');

export {
  validationConfig,
  buttonEditProfileOpen,
  formProfile,
  nameInput,
  activityInput,
  cardTemplateSelector,
  cardListSelector,
  buttonAddCardOpen,
  formCard,
  titleInput,
  linkInput,
  buttonChangeAvatar,
  formAvatar,
  avatarLink
};