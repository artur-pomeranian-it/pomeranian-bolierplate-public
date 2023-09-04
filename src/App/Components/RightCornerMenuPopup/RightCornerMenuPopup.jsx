import { Link } from 'react-router-dom';
import './styles.css';
import { MenuArrow } from '../Icons/MenuArrow';

export const RightCornerMenuPopup = ({ handleClose }) => {
  return (
    <div className="header-login">
      <MenuArrow onClick={handleClose} className="header-login-arrow" />
      <button
        onClick={handleClose}
        className="header-login-button header-login-button--primary"
      >
        zaloguj się
      </button>
      <p>
        Nie masz konta? <Link>Zarejestruj się.</Link>
      </p>
    </div>
  );
};
