import React from "react";
import useForm from "../hooks/useForm";

function Login({ onLogin, isLoading }) {
  
  const { values: userState, handleChange: handleChange, setValues: setUserState, errors: errorsState, setErrors: setErrors, isValid: isValid, setIsValid: setIsValid } = useForm({ email: '', password: '' })

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userState);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form method="post" className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" name="email" onChange={handleChange} value={userState.email || ''} placeholder="Email" minLength="2" maxLength="40" required autoComplete="off" />
        <span className="auth__error">{errorsState.email}</span>
        <input className="auth__input" type="password" name="password" onChange={handleChange} value={userState.password || ''} placeholder="Пароль" minLength="6" maxLength="40" required autoComplete="off" />
        <span className="auth__error">{errorsState.password}</span>
        <button disabled={!isValid} className="auth__button" type="submit">{isLoading ? `Подождите...` : `Войти`}</button>
      </form>
    </section>
  )
}

export default Login