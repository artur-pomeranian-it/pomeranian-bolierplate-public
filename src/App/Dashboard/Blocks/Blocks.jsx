import { Link } from 'react-router-dom';
// import personalcard from '../../Images/tiles/personalcard.svg';
import { PersonalCardIcon } from '../../Components/Icons/PersonalCardIcon';
import { EditIcon } from '../../Components/Icons/EditIcon';
import { TechStackIcon } from '../../Components/Icons/TechStackIcon';
import { BookIcon } from '../../Components/Icons/BookIcon';
import { MessageIcon } from '../../Components/Icons/MessageIcon';
import wavingHand from '../../Images/waving-hand-sign.png';
import './styles.css';

export const Blocks = () => {
  const SeeMoreLink = ({ to }) => {
    return <Link to={to}>zobacz więcej &gt;</Link>;
  };

  return (
    <div className="dashboard-tiles-container">
      <h2>
        <img
          src={wavingHand}
          alt="waving hand"
          className="dashboard__waving-hand"
        />
        Hej, tu Artur!
      </h2>
      <p>
        Poniżej znajdziesz najważniejsze informacje na temat mojej działalności.
      </p>
      <div className="dashboard-tiles">
        <div>
          <h3>Moje CV</h3>
          <PersonalCardIcon className="dashboard-icon" />
          <p className="dashboard-tile-description">
            podgląd cv wraz z doświadczeniem
          </p>
          <SeeMoreLink to="/cv" />
        </div>

        <div>
          <h3>Ćwiczenia</h3>
          <EditIcon className="dashboard-icon" />
          <p className="dashboard-tile-description">
            Wszystkie wykonane ćwiczenia
          </p>
          <SeeMoreLink to="/exercises" />
        </div>

        <div>
          <h3>Blog</h3>
          <BookIcon className="dashboard-icon" />
          <p className="dashboard-tile-description">
            wpisy blogowe o technologii front-end
          </p>
          <SeeMoreLink to="/blog" />
        </div>

        <div>
          <h3>Tech stack</h3>
          <TechStackIcon className="dashboard-icon" />
          <p className="dashboard-tile-description">
            stack technologiczny realizowany na kursie
          </p>
          <SeeMoreLink to="/tech-stack" />
        </div>

        <div>
          <h3>FAQ</h3>
          <MessageIcon className="dashboard-icon" />
          <p className="dashboard-tile-description">
            odpowiedzi na najczęstrze pytania
          </p>
          <SeeMoreLink to="/faq" />
        </div>
      </div>
    </div>
  );
};
