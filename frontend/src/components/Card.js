import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <li className="places__card">
      <img onClick={() => onCardClick(card)} src={card.link} className="places__image" alt={card.name} />
      {isOwn && <button onClick={() => onCardDelete(card)} type="button" className="places__button places__button_type_trash" aria-label="Кнопка удаления" />}
      <div className="places__name">
        <h2 className="places__title">{card.name}</h2>
        <div className="places_likes">
          <button type="button" onClick={() => onCardLike(card)} className={`places__button places__button_type_like ${isLiked && `active`}`} aria-label="Кнопка лайка" />
          <p className={`places__counter ${card.likes.length > 0 && `places__counter_active`}`}>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card