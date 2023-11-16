import React, { useState } from 'react';
import { useFormInputs } from './useFormInputs';
import { registerSchema } from './schemas';
import { register } from '../../../Firebase/firebaseClient';

export const Register = ({ toggle }) => {
  const [inputs, handleInputChange] = useFormInputs();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    try {
      const { email, password } = await registerSchema.validate(inputs);
      await register(email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register Form</h2>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirmPassword"
          autoComplete="off"
          required
          onChange={handleInputChange}
        />
        <input type="submit" value="Register" />
        <p>
          Already have an account?{' '}
          <button type="button" onClick={toggle}>
            Log In
          </button>
        </p>
        <p className="auth-form-error">{errorMessage}</p>
      </form>
    </div>
  );
};
