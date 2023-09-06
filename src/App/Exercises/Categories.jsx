import React from 'react';
import { NavLink } from 'react-router-dom';

import './categories.css';
import reactIcon from '../Images/tech-stack/react.svg';
import htmlIcon from '../Images/tech-stack/html.svg';
import jsIcon from '../Images/tech-stack/js.svg';

export const Categories = () => {
  return (
    <div>
      <h2>Kategorie</h2>
      <div className="exercises-categories">
        <NavLink to="html-css" className="excercise-card excercise-category">
          <img src={htmlIcon} alt="html icon" />
          <span>HTML & CSS</span>
        </NavLink>
        <NavLink to="js" className="excercise-card excercise-category">
          <img src={jsIcon} alt="js icon" />
          <span>JS</span>
        </NavLink>
        <NavLink to="react" className="excercise-card excercise-category">
          <img src={reactIcon} alt="react icon" />
          <span>React</span>
        </NavLink>
        {/* <NavLink to="web-api">Web API - lista ćwiczeń</NavLink> */}
        {/* <NavLink to="async">Asynchroniczność - lista ćwiczeń</NavLink> */}
        {/* <NavLink to="firebase">Firebase - lista ćwiczeń</NavLink> */}
      </div>
    </div>
  );
};
