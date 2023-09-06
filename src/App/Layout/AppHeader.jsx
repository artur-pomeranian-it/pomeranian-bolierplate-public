import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Components/Logo/Logo';
import { HeaderMenu } from '../Components/HeaderMenu/HeaderMenu';
import hamburgerSVG from '../Images/hamburger.svg';
import personSVG from '../Images/person.svg';
import './styles/header.css';

export function AppHeader({ toggleMenu }) {
  const [isHeaderMenuVisible, setIsHeaderMenuVisible] = useState(false);
  return (
    <header>
      <button className="header__button" onClick={toggleMenu}>
        <img src={hamburgerSVG} alt="toggle menu icon" />
      </button>
      <Link to="/">
        <Logo />
      </Link>
      <HeaderMenu isVisible={isHeaderMenuVisible} />
      <button
        className="header__button"
        onClick={() => setIsHeaderMenuVisible(!isHeaderMenuVisible)}
      >
        <img src={personSVG} alt="personal details icon" />
      </button>
    </header>
  );
}
