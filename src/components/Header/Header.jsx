import Logo from "../Logo/Logo";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import css from "./Header.module.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);

  const handleOpenLogin = () => {
    setIsRegistrationModal(false);
    setIsModalOpen(true);
  };

  const handleOpenRegistration = () => {
    setIsRegistrationModal(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRegistrationModal(false);
  };

  const activeClass = ({ isActive }) => clsx(css.link, isActive && css.active);

  return (
    <div className={css.headerWrapper}>
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
                <button
                  className={css.buttonContainerItem}
                  onClick={() => setIsLoggedIn(false)}
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className={css.buttonContainer}>
                <button
                  className={css.buttonContainerItem}
                  onClick={handleOpenLogin}
                >
                  Log in
                </button>
                <button
                  className={css.registrationButton}
                  onClick={handleOpenRegistration}
                >
                  Registration
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Модалки */}
      {isModalOpen && !isRegistrationModal && (
        <LoginFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      {isModalOpen && isRegistrationModal && (
        <RegistrationForm isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Header;
