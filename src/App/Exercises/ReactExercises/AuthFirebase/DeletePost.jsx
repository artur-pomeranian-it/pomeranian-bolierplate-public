import { deletePost } from '../../../Firebase/firebaseClient';

export const DeletePost = ({ id, revalidate }) => {
  const handleDelete = async (id) => {
    await deletePost(id);
    revalidate();
  };
  return <button onClick={() => handleDelete(id)}>Delete</button>;
};
