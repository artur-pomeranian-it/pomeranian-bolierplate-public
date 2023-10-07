import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../../Firebase/firebaseConfig';
import { useFormInputs } from './useFormInputs';

const addPosts = async (uid, data, _callback) => {
  const { title, description } = data;
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      author: uid,
      title,
      description,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// const getAllPosts = async (callbac) => {
//   const querySnapshot = await getDocs(collection(db, 'posts'));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//   });
// };

const getMyPosts = async (uid, _callbac) => {
  const citiesRef = collection(db, 'posts');
  const q = query(citiesRef, where('author', '==', uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
};

export const Posts = ({ uid }) => {
  const [inputs, handleInputChange] = useFormInputs();
  useEffect(() => {
    getMyPosts(uid, () => {});
  }, [uid]);

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    console.log(inputs);
    const { title, description } = inputs;
    if (title && description) {
      addPosts(uid, inputs, () => {});
    }
  };

  return (
    <div>
      <h1>Firebase Posts</h1>
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
      </div>
    </div>
  );
};
