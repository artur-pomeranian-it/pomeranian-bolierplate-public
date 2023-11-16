import React from 'react';
import { app } from '../../../Firebase/firebaseConfig';
// import { getApp } from 'firebase/app';
import { AuthenticateUser } from './AuthenticateUser';
import { LogOut } from './LogOut';
import { useAuthStatus } from './useAuthStatus';

import './styles.css';
import { Posts } from './Posts';

export const AuthFirebase = () => {
  const [isLoggedIn, user] = useAuthStatus();
  console.log('Firebase initialized: ', app.options.projectId);
  return (
    <div>
      <h1>Authorization with Firebase</h1>
      {isLoggedIn === undefined ? null : (
        <div>
          <p>User uid: {JSON.stringify(user?.uid)}</p>
          {isLoggedIn === 'yes' ? (
            <div>
              You're logged in! <LogOut />
              <Posts uid={user?.uid} />
            </div>
          ) : (
            <AuthenticateUser />
          )}
        </div>
      )}
    </div>
  );
};
