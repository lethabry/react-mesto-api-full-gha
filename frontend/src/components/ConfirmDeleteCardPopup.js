import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  const popupWithFormProps = {
    name: 'delete',
    isOpen: props.isOpen,
    title: 'Вы уверены?',
    submitButtonTextContent: props.isLoading ? 'Удаление...' : 'Да',
    onClosePopup: props.onClose,
    onSubmit: handleSubmit,
    closeByOverlay: props.closeByOverlay,
    isValid: true
  }

  return (
    <PopupWithForm {...popupWithFormProps} />
  )
}

export default ConfirmDeleteCardPopup