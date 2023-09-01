import { RoundImage } from '../../Components/RoundImage/RoundImage';

export const MyData = () => {
  return (
    <div className="dashboard-about-me">
      <div>
        <RoundImage size="90" />
        <h2 className="dashboard-name">Name</h2>
        <p>City</p>
      </div>

      <div className="email-container">
        <p>Email:</p>
        <p>
          <a href="mailto:_@gmail.com">__gmail.com</a>
        </p>
      </div>

      <div className="telephone-container">
        <p>Telefon:</p>
        <p>
          <a href="tel:">phone</a>
        </p>
      </div>
    </div>
  );
};
