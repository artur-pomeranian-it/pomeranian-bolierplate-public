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
    return <Link to={to}>Zobacz więcej</Link>;
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
          <PersonalCardIcon />
          <p className="dashboard-tile-description">
            podgląd cv wraz z doświadczeniem
          </p>
          <SeeMoreLink to="tech-stack" />
        </div>

        <div>
          <h3>Ćwiczenia</h3>
          <EditIcon />
          <p className="dashboard-tile-description">
            Wszystkie wykonane ćwiczenia
          </p>
          <SeeMoreLink to="tech-stack" />
        </div>

        <div>
          <h3>Blog</h3>
          <BookIcon />
          <p className="dashboard-tile-description">
            wpisy blogowe o technologii front-end
          </p>
          <SeeMoreLink to="tech-stack" />
        </div>

        <div>
          <h3>Tech stack</h3>
          <TechStackIcon />
          <p className="dashboard-tile-description">
            stack technologiczny realizowany na kursie
          </p>
          <SeeMoreLink to="tech-stack" />
        </div>

        <div>
          <h3>FAQ</h3>
          <MessageIcon />
          <p className="dashboard-tile-description">
            odpowiedzi na najczęstrze pytania
          </p>
          <SeeMoreLink to="tech-stack" />
        </div>
      </div>
    </div>
  );
};
