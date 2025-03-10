import Logo from '../Logo/Logo';
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import Icon from '../Icon/Icon'
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import css from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isModalOpenLogIn, setIsModalOpenLogIn] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);

  const handleOpen = () => setIsModalOpenLogIn(true);
  const handleClose = () => setIsModalOpenLogIn(false);
  const handleOpenRegistration = () => setIsModalOpenRegistration(true);
  const handleCloseRegistration = () => setIsModalOpenRegistration(false);

 

  const activeClass = ({ isActive }) => clsx(css.link, isActive && css.active);
  
  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.nav}>
        <div className={css.linkContainer}>
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/psychologist" className={activeClass}>
            Psychologists
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={activeClass}>
              Favorites
            </NavLink>
          )}
        </div>
      </nav>
      <nav className={css.nav}>
        <div className={css.authContainer}>
          {isLoggedIn ? (
            <div className={css.buttonContainer}>
              <span>Welcome, User</span>{" "}
              <button className={css.buttonContainerItem} onClick={handleOpen}>
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
              {isModalOpenLogIn && <LoginFormModal onClose={handleClose} />}
              <button
                className={css.registrationButton}
                onClick={handleOpenRegistration}
              >
                Registration
              </button>
              {isModalOpenRegistration && (
                <RegistrationForm onClose={handleCloseRegistration} />
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
