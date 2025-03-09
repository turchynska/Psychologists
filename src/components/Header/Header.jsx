import Logo from "../../img/icons/Logo.svg";
import LoginForm from "../LoginFormModal/LoginFormModal";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <img src={Logo} alt="logo" className="logoImg" />
      </div>
      <nav className={css.navigate}>
        <ul className={css.list}>
          <li className={css.item}>
            <Link to="/home">Home</Link>
          </li>
          <li className={css.item}>
            <Link to="/psychologist">Psychologists</Link>
          </li>
        </ul>
      </nav>
      <div className={css.authLink}>
        <li>
          <Link >
            <LoginForm />
          </Link>
        </li>
        <li>
          <Link >
            <RegistrationForm />
          </Link>
        </li>
      </div>
    </header>
  );
};
export default Header;
