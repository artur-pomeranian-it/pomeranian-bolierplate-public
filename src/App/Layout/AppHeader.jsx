import React from 'react';
import { Link } from 'react-router-dom';

import './styles/header.css';
import { Logo } from '../Components/Logo/Logo';
import { HeaderMenu } from '../Components/HeaderMenu/HeaderMenu';

export function AppHeader() {
  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      <HeaderMenu />
    </header>
  );
}
