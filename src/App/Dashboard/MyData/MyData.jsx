import { RoundImage } from '../../Components/RoundImage/RoundImage';

export const MyData = () => {
  return (
    <div className="dashboard-about">
      <RoundImage size="90" />
      <div className="dashboard-about__group">
        <h2 className="dashboard-name">Artur Trener</h2>
        <p>Gdańsk</p>
      </div>

      <div className="dashboard-about__group">
        <p>e-mail:</p>
        <p>
          <a href="mailto:artur.jedrzejczak@pomeranianstartit.pl">
            artur.jedrzejczak@pomeranianstartit.pl
          </a>
        </p>
      </div>

      <div className="dashboard-about__group">
        <p>telefon:</p>
        <p>
          <a href="tel:+48888888">(+48) 888 888 888</a>
        </p>
      </div>
    </div>
  );
};
