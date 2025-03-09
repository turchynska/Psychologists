import Logo from '../Logo/Logo';
import LoginForm from "../LoginFormModal/LoginFormModal";
import Icon from '../Icon/Icon'
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from 'react-redux';
import css from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Локальний стан для автентифікації
  const [isModalOpenLogIn, setIsModalOpenLogIn] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);

  const handleOpen = () => setIsModalOpenLogIn(true);
  const handleClose = () => setIsModalOpenLogIn(false);
  const handleOpenRegistration = () => setIsModalOpenRegistration(true);
  const handleCloseRegistration = () => setIsModalOpenRegistration(false);

  const handleLogOut = () => {
    setIsLoggedIn(false); // Вихід з системи
  };

  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.navigate}>
        <div className={css.link}>
          <NavLink to="/" className={css.link}>
            Home
          </NavLink>
          <NavLink to="/psychologist" className={css.link}>
            Psychologists
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={css.link}>
              Favorites
            </NavLink>
          )}
        </div>
      </nav>
      <div className={css.authContainer}>
        {isLoggedIn ? (
          <div className={css.welcomeContainer}>
            <span>Welcome, User</span>{" "}
            <button className={css.logoutButton} onClick={handleLogOut}>
              Log out
            </button>
          </div>
        ) : (
          <div className={css.buttonContainer}>
            <button className={css.buttonContainerItem} onClick={handleOpen}>
              <Icon
                id="icon-logo"
                width={20}
                height={20}
                className={css.icon}
              />
              Log in
            </button>
            {isModalOpenLogIn && <LogInModal onClose={handleClose} />}
            <button
              className={css.registrationButton}
              onClick={handleOpenRegistration}
            >
              Registration
            </button>
            {isModalOpenRegistration && (
              <RegistrationModal onClose={handleCloseRegistration} />
            )}
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
