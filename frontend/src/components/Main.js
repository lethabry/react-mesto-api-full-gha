import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <div className='profile__table'>
          <div className="profile__images">
            <img src={currentUser.avatar} alt="Фотография профиля" className="profile__avatar" />
            <button onClick={props.onEditAvatar} type="button" className="profile__button profile__button_type_avatar"
              aria-label="Кнопка редактирования аватара" />
          </div>
          <div className="profile__info">
            <div className="profile__string">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} type="button" className="hover profile__button profile__button_type_edit"
                aria-label="Кнопка редактирования профиля" />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} type="button" className="hover profile__button profile__button_type_add"
          aria-label="Кнопка добавления фотографий" />
      </section>
      <section className="places" aria-label="Места">
        <ul className="places__cards">
          {props.cards.map(card => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>

    </main>
  )
}

export default Main