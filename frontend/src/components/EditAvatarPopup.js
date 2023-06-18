import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const avatarLink = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarLink.current.value);
  }

  function handleChange() {
    const { value, name } = avatarLink.current;
    setErrors({ ...errors, [name]: avatarLink.current.validationMessage });
    setIsValid(avatarLink.current.closest('form').checkValidity());

  }

  React.useEffect(() => {
    avatarLink.current.value = '';
    setErrors({});
  }, [props.isOpen])


  const popupEditAvatarProps = {
    name: 'avatar',
    isOpen: props.isOpen,
    title: 'Обновить аватар',
    submitButtonTextContent: props.isLoading ? 'Сохранение...' : 'Сохранить',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit,
    closeByOverlay: props.closeByOverlay,
    isValid: isValid
  }

  return (
    <PopupWithForm {...popupEditAvatarProps}>
      <input type="url" ref={avatarLink} onChange={handleChange} name="link" placeholder="Ссылка на аватар" id="avatar-link-input"
        className="popup__input popup__input_type_activity" required autoComplete="off" />
      <span className="popup__error avatar-link-input-error">{errors.link}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup