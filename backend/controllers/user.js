const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const DataMatchError = require('../utils/errors/DataMatchError');
const AuthError = require('../utils/errors/AuthError');

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передано некорректное значение id пользователя'));
      }
      return next(err);
    });
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Передано некорректное значение id пользователя'));
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданны некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new DataMatchError('Почта уже занята'));
      }
      return next(err);
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданны некорректные данные при редактировании пользователя'));
      }
      return next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданны некорректные данные при редактировании аватара'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentals(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? 'secret_key' : process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: 'none' });
      res.send({ _id: user._id });
    })
    .catch(next);
}

function logout(req, res) {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Успешно' });
}

module.exports = {
  getUsers, getCurrentUser, getUserById, createUser, updateProfile, updateAvatar, login, logout,
};
