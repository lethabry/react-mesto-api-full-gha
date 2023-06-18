import React from "react";
import successAuthorizedPath from '../images/authorized.png'
import deniedAuthorizedPath from '../images/denied.png'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && `popup_active`}`} tabIndex="0">
      <div className="popup__block">
        <img className="popup__status" src={props.isRegistrationSuccess ? successAuthorizedPath : deniedAuthorizedPath} alt={props.isRegistrationSuccess ? `Успешная регистрация` : `Ошибка при регистрации`} />
        <h2 className="popup__info">{props.isRegistrationSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</h2>
        <button type="button" onClick={props.onClosePopup} className="hover popup__button popup__button_type_close"
          aria-label="Кнопка закрытия окна" />
      </div>
    </div>
  )
}

export default InfoTooltip