import './styles.css';
import { SettingIcon } from '../Icons/SettingIcon';
import { MenuArrow } from '../Icons/MenuArrow';
import { RoundImage } from '../../Components/RoundImage/RoundImage';
import { RightCornerMenuPopup } from '../RightCornerMenuPopup/RightCornerMenuPopup';
import { useState } from 'react';

export const HeaderMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header-menu">
      <SettingIcon className="header-menu__settings" />
      <RoundImage size="50" />
      <div className="header-menu__text">
        <h4>Artur Trener</h4>
        <h5>Kursant</h5>
      </div>
      <MenuArrow
        onClick={() => setShowMenu(true)}
        className="header-menu__arrow"
      />
      {showMenu && (
        <RightCornerMenuPopup handleClose={() => setShowMenu(false)} />
      )}
    </div>
  );
};
