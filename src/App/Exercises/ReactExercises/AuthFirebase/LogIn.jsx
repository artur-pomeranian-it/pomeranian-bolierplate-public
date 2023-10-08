import React, { useState } from 'react';
import { useFormInputs } from './useFormInputs';
import { loginSchema } from './schemas';
import { logIn } from '../../../Firebase/firebaseClient';
import * as yup from 'yup';

export const LogIn = ({ toggle }) => {
  const [inputs, handleInputChange] = useFormInputs();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    try {
      const { email, password } = await loginSchema.validate(inputs);
      await logIn(email, password);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.path, error.message);
      }
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Log In</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          autoComplete="off"
          required
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="off"
          required
          onChange={handleInputChange}
        />
        <input type="submit" value="Log In" />
        <p>
          Don't have an account?{' '}
          <button type="button" onClick={toggle}>
            Register
          </button>
        </p>
        <p className="auth-form-error">{errorMessage}</p>
      </form>
    </div>
  );
};
