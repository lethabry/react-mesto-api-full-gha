import React from "react";
import { Link } from "react-router-dom"

function PageNotFound() {

  return (
    <div className="not-found">
      <h3 className="not-found__title">404 - Страница не найдена</h3>
      <p className="not-found__text">Ой, здесь ничего нет</p>
      <Link className="hover not-found__link" to="/">Назад</Link>
    </div>
  )
}

export default PageNotFound