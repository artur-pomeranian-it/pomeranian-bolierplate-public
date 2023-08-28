import { useSelector } from 'react-redux';
import './styles.css';

export const CardDetails = ({ profile }) => {
  return (
    <div>
      CardDetails
      {profile === 'business' && <div>Company Logo</div>}
    </div>
  );
};

export const Accounts = ({ profile }) => {
  return (
    <div>
      Accounts
      <div>Current profile: {profile}</div>
      <button>Change profile</button>
    </div>
  );
};

export const Cards = () => {
  return (
    <div>
      Cards <CardDetails />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Accounts />
      <Cards />
    </div>
  );
};

export const ReduxTest = () => {
  // business, retail
  return (
    <div className="test-redux">
      Main Page
      <Dashboard />
    </div>
  );
};
