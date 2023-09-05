import { NavLink } from 'react-router-dom';

import { HouseIcon } from '../Components/Icons/HouseIcon';
import { EditIcon } from '../Components/Icons/EditIcon';
import { ElementIcon } from '../Components/Icons/ElementIcon';
import { PersonalCardIcon } from '../Components/Icons/PersonalCardIcon';
import { CalendarIcon } from '../Components/Icons/CalendarIcon';
import { SettingIcon } from '../Components/Icons/SettingIcon';
import { BookIcon } from '../Components/Icons/BookIcon';
import { MessageIcon } from '../Components/Icons/MessageIcon';

import './styles/aside.css';
import { TechStackIcon } from '../Components/Icons/TechStackIcon';

export function AppAside({ className }) {
  return (
    <aside className={className}>
      <nav>
        <ul>
          <li>
            <NavLink to="dashboard">
              <HouseIcon className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="cv">
              <PersonalCardIcon className="icon" /> Moje cv
            </NavLink>
          </li>
          <li>
            <NavLink to="tech-stack">
              <TechStackIcon className="icon" /> Tech stack
            </NavLink>
          </li>
          <li>
            <NavLink to="blocks">
              <ElementIcon className="icon" />
              Bloki
            </NavLink>
          </li>
          <li>
            <NavLink to="exercises">
              <EditIcon className="icon" />
              Ćwiczenia
            </NavLink>
          </li>
          <li>
            <NavLink to="calendar">
              <CalendarIcon className="icon" />
              Kalendarz
            </NavLink>
          </li>
          <li>
            <NavLink to="blog">
              <BookIcon className="icon" />
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="faq">
              <MessageIcon className="icon" />
              FAQ
            </NavLink>
          </li>
          <hr></hr>
          <li>
            <NavLink to="settings">
              <SettingIcon className="icon" />
              Ustawienia
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
