import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export const logOut = () => {
  const auth = getAuth();
  signOut(auth);
};

export const register = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const addPosts = async (data, callback = () => {}) => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) {
    callback('uidMissingError');
    return;
  }
  const { title, description } = data;
  try {
    callback('Pending');
    const docRef = await addDoc(collection(db, 'posts'), {
      author: uid,
      title,
      description,
    });
    console.log('Document written with ID: ', docRef.id);
    callback('Done');
  } catch (e) {
    console.error('Error adding document: ', e);
    callback('Error');
  }
};

export const getMyPosts = async () => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const citiesRef = collection(db, 'posts');
  const q = query(citiesRef, where('author', '==', uid));
  const querySnapshot = await getDocs(q);
  const result = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log('TUTU', doc.id, ' => ', doc.data());
    result.push({ id: doc.id, ...doc.data() });
  });
  return result;
};

export const deletePost = async (id) => {
  return deleteDoc(doc(db, 'posts', id));
};
