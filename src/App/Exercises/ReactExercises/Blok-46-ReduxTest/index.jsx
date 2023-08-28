import { useDispatch, useSelector } from 'react-redux';
import {
  toggleProfile,
  toggleDarkMode,
  selectProfile,
} from '../../../Store/testSlice';
import './styles.css';

export const CardDetails = () => {
  const profile = useSelector(selectProfile);
  const darkMode = useSelector((state) => state?.testSlice?.darkMode);
  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      CardDetails
      {profile === 'business' && <div>Company Logo</div>}
    </div>
  );
};

export const Accounts = () => {
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  return (
    <div>
      Accounts
      <div>Current profile: {profile}</div>
      <button onClick={() => dispatch(toggleDarkMode())}>
        Toggle Dark mode
      </button>
      <button onClick={() => dispatch(toggleProfile())}>Change profile</button>
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
