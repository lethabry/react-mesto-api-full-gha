import React from "react";
import logoPath from '../images/mesto_logo.svg'
import buttonMenuPathClose from '../images/menu__button.png'
import buttonMenuPathOpen from '../images/Close_Icon.svg'
import { Link, useLocation, Routes, Route } from 'react-router-dom'

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место" />
      <div className="header__string" style={(props.windowWidth <= 436 && location.pathname === '/react-mesto-auth/') ? { display: 'none' } : { display: 'flex' }}>
        <p className="header__email">{props.isLoggedIn && props.userEmail}</p>
        <Routes>
          <Route path="/react-mesto-auth/sign-up" element={<Link to="/react-mesto-auth/sign-in" className="hover header__link">Войти</ Link>} />
          <Route path="/react-mesto-auth/sign-in" element={<Link to="/react-mesto-auth/sign-up" className="hover header__link">Регистрация</ Link>} />
          <Route path="/react-mesto-auth/" element={<Link to="/react-mesto-auth/sign-in" onClick={() => { props.onSignOut() }} style={{ color: '#A9A9A9' }} className="hover header__link">Выйти</ Link>} />
        </Routes>
      </div>
      {location.pathname === '/react-mesto-auth/' && <button type="button" onClick={() => props.onOpenMenu()} style={props.isOpen ? { backgroundImage: `url(${buttonMenuPathOpen})` } : { backgroundImage: `url(${buttonMenuPathClose})` }} className="hover header__button_type_information" />}
    </header >
  );
}

export default Header;