import Logo from "../Logo/Logo";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../redux/auth/operations.js";
import clsx from "clsx";
import css from "./Header.module.css";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationModal, setIsRegistrationModal] = useState(false);

  const handleOpenLogin = () => {
    setIsRegistrationModal(false);
    setIsModalOpen(true);
  };

  const handleOpenRegistration = () => {
    setIsRegistrationModal(true); // ✅ тут була помилка — не вмикалося реєстраційне вікно
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsRegistrationModal(false);
  };

const handleLogout = () => {
  dispatch(logout())
    .unwrap()
    .then(() => {
      navigate("/"); // 🔁 перенаправляє на головну (або на будь-який потрібний маршрут)
    })
    .catch((error) => {
      toast.error("Logout failed");
    });
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
                <span>Welcome, {user.name || "User"}</span>
                <button
                  className={css.buttonContainerItem}
                  onClick={handleLogout}
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

      {isModalOpen && !isRegistrationModal && (
        <LoginFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
      {isModalOpen && isRegistrationModal && (
        <RegistrationForm
          isOpen={isModalOpen}
          onClose={handleCloseModal} // Pass handleCloseModal instead of setModalOpen
        />
      )}
    </div>
  );
};

export default Header;
