import { addPosts } from '../../../Firebase/firebaseClient';
import { useFormInputs } from './useFormInputs';
import { useState } from 'react';

export const AddPost = ({ revalidate }) => {
  const [inputs, handleInputChange] = useFormInputs();
  // notStarted, Pending, Done, Error
  const [status, setStatus] = useState('notStarted');

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    // console.log(inputs);
    const { title, description } = inputs;
    if (title && description) {
      addPosts(inputs, (result) => {
        setStatus(result);
        revalidate();
      });
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Add a Post</h2>
      <form className="auth-form-container" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="description"
          name="title"
          placeholder="title"
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="description"
          maxLength={180}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Add" />
      </form>
      <div>Status: {status}</div>
    </div>
  );
};
