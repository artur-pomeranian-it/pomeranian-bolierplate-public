import { logOut } from '../../../Firebase/firebaseClient';

export const LogOut = () => (
  <button className="log-out-button" onClick={logOut}>
    Log Out
  </button>
);
