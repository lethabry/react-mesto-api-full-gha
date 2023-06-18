import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import Register from './Register';
import Login from './Login';
import UserInfo from './UserInfo';
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import ProtectedRouteElement from './ProtectedRoute';
import '../App.css';
import api from '../utils/api';
import * as mestoAuth from '../utils/mestoAuth';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeleteCardPopupOpen, setIsConfirmDeleteCardPopupOpen] = React.useState(false);
  const [isRegistrationStatusPopupOpen, setIsRegistrationStatusPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = isConfirmDeleteCardPopupOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  const [isUserInfoActive, setisUserInfoActive] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    handleToken();
    if (isLoggedIn) {
      Promise.all([api.getCurrentUser(), api.getCards()])
        .then(([userData, cardsData]) => {
          const { cards } = cardsData;
          const { user } = userData;
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(err => console.log(`Error: ${err.message}`))
    }
  }, [isLoggedIn])

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [windowWidth])

  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function closeByOverlay(e) {
    if (e.target.classList.contains('popup_active')) {
      closeAllPopups();
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleConfirmDeleteCardClick(card) {
    setIsConfirmDeleteCardPopupOpen(!isConfirmDeleteCardPopupOpen);
    setDeleteCard(card);
  }

  function handleRegistrationStatusClick() {
    setIsRegistrationStatusPopupOpen(!isRegistrationStatusPopupOpen)
  }

  function handleUserInfoButtonClick() {
    setisUserInfoActive(!isUserInfoActive);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardPopupOpen(false);
    setIsRegistrationStatusPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
      })
      .catch(err => console.log(`Error: ${err.message}`));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id)
        });
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.message}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.changeUserData(name, about)
      .then(userData => {
        const { user } = userData
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.message}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api.changeAvatar(avatarLink)
      .then(userData => {
        const { user } = userData;
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.message}`))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api.addNewCard(name, link)
      .then(cardData => {
        setCards([cardData.card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err.message}`))
      .finally(() => setIsLoading(false))
  }

  function handleRegistrationSubmit(data) {
    setIsLoading(true);
    const { email, password } = data;
    mestoAuth.register(email, password)
      .then(res => {
        handleRegistrationStatusClick();
        setIsRegistrationSuccess(true);
        navigate('/react-mesto-auth/sign-in', { replace: true })
      })
      .catch(err => {
        console.log(`Error: ${err.message}`);
        handleRegistrationStatusClick();
        setIsRegistrationSuccess(false);
      })
      .finally(() => setIsLoading(false))
  }

  function handleLogonSubmit(data) {
    setIsLoading(true);
    const { email, password } = data;
    mestoAuth.login(email, password)
      .then(data => {
        if (data._id) {
          setUserEmail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(`Error: ${err.message}`);
        handleRegistrationStatusClick();
        setIsRegistrationSuccess(false);
      })
      .finally(() => setIsLoading(false))
  }

  function handleToken() {
    const userId = localStorage.getItem('jwt');
    if (userId) {
      mestoAuth.getContent()
        .then(res => {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
          setUserEmail(res.user.email);
        })
        .catch((err) => console.log(`Error: ${err.message}`))
    }
  }

  function handleSignOut() {
    mestoAuth.logout()
      .then( _ => {
        localStorage.removeItem('jwt');
        navigate('/react-mesto-auth/sign-in');
        setIsLoggedIn(false);
        setUserEmail('');
      })
      .catch((err) => console.log(`Error: ${err.message}`))
  }

  const mainProps = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    cards: cards,
    onCardLike: handleCardLike,
    onCardDelete: handleConfirmDeleteCardClick,
    isLoggedIn: isLoggedIn
  }

  const imagePopupProps = {
    card: selectedCard,
    onClosePopup: closeAllPopups,
    closeByOverlay: closeByOverlay
  }

  const editProfilePopupProps = {
    isOpen: isEditProfilePopupOpen,
    onClose: closeAllPopups,
    onUpdateUser: handleUpdateUser,
    isLoading: isLoading,
    closeByOverlay: closeByOverlay
  }

  const editAvatarPopupProps = {
    isOpen: isEditAvatarPopupOpen,
    onClose: closeAllPopups,
    onUpdateAvatar: handleUpdateAvatar,
    isLoading: isLoading,
    closeByOverlay: closeByOverlay
  }

  const addPlacePopupProps = {
    isOpen: isAddPlacePopupOpen,
    onClose: closeAllPopups,
    onAddPlace: handleAddPlaceSubmit,
    isLoading: isLoading,
    closeByOverlay: closeByOverlay
  }

  const confirmDeleteCardPopupProps = {
    isOpen: isConfirmDeleteCardPopupOpen,
    onClose: closeAllPopups,
    onDeleteCard: handleCardDelete,
    card: deleteCard,
    isLoading: isLoading,
    closeByOverlay: closeByOverlay
  }

  const infoTooltipProps = {
    isOpen: isRegistrationStatusPopupOpen,
    onClosePopup: closeAllPopups,
    isRegistrationSuccess: isRegistrationSuccess
  }

  const headerProps = {
    onOpenMenu: handleUserInfoButtonClick,
    isOpen: isUserInfoActive,
    userEmail: userEmail,
    onSignOut: handleSignOut,
    windowWidth: windowWidth,
    isLoggedIn: isLoggedIn
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {(isUserInfoActive && location.pathname === '/react-mesto-auth/') && <UserInfo userEmail={userEmail} onSignOut={handleSignOut} />}
        <Header {...headerProps} />
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="react-mesto-auth/" replace /> : <Navigate to="react-mesto-auth/sign-in" replace />} />
          <Route path="react-mesto-auth/sign-up" element={<Register onRegistration={handleRegistrationSubmit} isLoading={isLoading} />} />
          <Route path="react-mesto-auth/sign-in" element={<Login onLogin={handleLogonSubmit} isLoading={isLoading} />} />
          <Route path="react-mesto-auth/" element={<ProtectedRouteElement element={Main} {...mainProps} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <InfoTooltip {...infoTooltipProps} />
        <EditProfilePopup {...editProfilePopupProps} />
        <AddPlacePopup {...addPlacePopupProps} />
        <EditAvatarPopup {...editAvatarPopupProps} />
        <ConfirmDeleteCardPopup {...confirmDeleteCardPopupProps} />
        <ImagePopup {...imagePopupProps} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;