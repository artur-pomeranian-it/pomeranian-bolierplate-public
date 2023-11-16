import { useState } from 'react';
import { LogIn } from './LogIn';
import { Register } from './Register';

export const AuthenticateUser = () => {
  const [toggleAuth, setToggleAuth] = useState(true);
  return (
    <div>
      {toggleAuth ? (
        <LogIn toggle={() => setToggleAuth(!toggleAuth)} />
      ) : (
        <Register toggle={() => setToggleAuth(!toggleAuth)} />
      )}
    </div>
  );
};
