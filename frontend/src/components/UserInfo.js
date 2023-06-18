import React from "react";

function UserInfo({ userEmail, onSignOut }) {
  return (
    <div className="user-info">
      <p className="user-info__email">{userEmail}</p>
      <button type="button" onClick={onSignOut} className="hover user-info__button">Выйти</button>
    </div>
  )
}

export default UserInfo