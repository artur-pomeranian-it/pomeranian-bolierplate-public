import './styles.css';
import { SettingIcon } from '../Icons/SettingIcon';
import { MenuArrow } from '../Icons/MenuArrow';
import { RoundImage } from '../../Components/RoundImage/RoundImage';

export const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <SettingIcon className="header-menu__settings" />
      <RoundImage size="50" />
      <div className="header-menu__text">
        <h4>Artur Trener</h4>
        <h5>Kursant</h5>
      </div>
      <MenuArrow className="header-menu__arrow" />
    </div>
  );
};
