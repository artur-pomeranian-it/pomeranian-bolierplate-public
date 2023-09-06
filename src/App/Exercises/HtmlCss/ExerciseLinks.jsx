import { Link } from 'react-router-dom';

import { blockRouterMetaData } from './view-router-data';
import fileSVG from '../../Images/file.svg';

export const ExerciseLinks = () => {
  return (
    <ul className="excercises-list">
      {blockRouterMetaData.map((blockMetaData) => (
        <li
          className="excercise-card excercise-list__item"
          key={blockMetaData.path}
        >
          <Link to={blockMetaData.path} className="excercise-list__link">
            <img src={fileSVG} alt="file icon" aria-hidden />
            <div className="excercise-list__name-date-container">
              <div>{blockMetaData.linkLabel}</div>
              <div className="excercise-list__date">{blockMetaData.date}</div>
            </div>
            <div className="execercise-list__tags">
              {blockMetaData.tags.map((tag) => (
                <span>{tag}</span>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
