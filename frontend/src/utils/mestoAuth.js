export const BASE_URL = 'http://localhost:3001';

function checkRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkRes(res))
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email": email, "password": password })
  })
    .then(res => checkRes(res))
    .then((data) => {
      if (data._id) {
        localStorage.setItem('jwt', data._id);
        return data;
      } else {
        return;
      }
    })
}

export function logout() {
  return fetch(`${BASE_URL}/logout`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => checkRes(res))
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => checkRes(res))
} 