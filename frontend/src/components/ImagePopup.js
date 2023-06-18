import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_card ${props.card.name !== undefined && `popup_active`}`} onClick={props.closeByOverlay} tabIndex="0">
      <div className="popup__block-image">
        <img src={props.card.link} className="popup__image" alt={props.card.name} />
        <h2 className="popup__description">{props.card.name}</h2>
        <button onClick={props.onClosePopup} type="button" className="hover popup__button popup__button_type_close"
          aria-label="Кнопка закрытия окна" />
      </div>
    </div>
  )
}

export default ImagePopup