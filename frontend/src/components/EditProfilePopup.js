import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values: profileState, handleChange: handleChange, setValues: setProfileState, errors: errorsState, setErrors: setErrors, isValid: isValid, setIsValid: setIsValid } = useForm({ name: '', about: '' })

  React.useEffect(() => {
    setProfileState({ name: currentUser.name, about: currentUser.about });
    setErrors({});
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(profileState.name, profileState.about);
  }

  const popupWithFormProps = {
    name: 'edit',
    isOpen: props.isOpen,
    title: 'Редактировать профиль',
    submitButtonTextContent: props.isLoading ? 'Сохранение...' : 'Сохранить',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit,
    closeByOverlay: props.closeByOverlay,
    isValid: isValid
  }

  return (
    <PopupWithForm {...popupWithFormProps} >
      <input onChange={handleChange} value={profileState.name || ''} type="text" name="name" placeholder="Ваше имя" id="name-input"
        className="popup__input popup__input_type_name" minLength="2" maxLength="40" required autoComplete="off" />
      <span className="popup__error name-input-error">{errorsState.name}</span>
      <input onChange={handleChange} value={profileState.about || ''} type="text" name="about" placeholder="Ваша деятельность" id="activity-input"
        className="popup__input popup__input_type_activity" minLength="2" maxLength="200" required autoComplete="off" />
      <span className="popup__error activity-input-error">{errorsState.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup