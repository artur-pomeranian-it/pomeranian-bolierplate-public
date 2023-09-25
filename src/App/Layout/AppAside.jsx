import { NavLink } from 'react-router-dom';

import { HouseIcon } from '../Components/Icons/HouseIcon';
import { EditIcon } from '../Components/Icons/EditIcon';
import { ElementIcon } from '../Components/Icons/ElementIcon';
import { PersonalCardIcon } from '../Components/Icons/PersonalCardIcon';

import './styles/aside.css';

export function AppAside() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <NavLink to="dashboard">
              <HouseIcon className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="cv">
              <PersonalCardIcon className="icon" /> CV
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
        </ul>
      </nav>
      <p style={{ padding: '1rem 0' }}>Sidebar items, widgets, etc</p>
    </aside>
  );
}
