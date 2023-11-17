// import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AddPost } from './AddPost';
import { getMyPosts } from '../../../Firebase/firebaseClient';
import { DeletePost } from './DeletePost';

// const getAllPosts = async (callbac) => {
//   const querySnapshot = await getDocs(collection(db, 'posts'));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
//   });
// };

export const Posts = ({ uid }) => {
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    getMyPosts()
      .then((docs) => setPosts(docs))
      .catch(console.error);
  };

  useEffect(() => {
    getPosts();
  }, [uid]);

  return (
    <div>
      <h1>Firebase Posts</h1>
      <h2>All Posts</h2>
      <ul>
        {posts.map(({ description, title, id }) => (
          <li>
            <strong>[ {title} ] - </strong>
            {description}
            <DeletePost id={id} revalidate={() => getPosts()} />
          </li>
        ))}
      </ul>
      <AddPost revalidate={() => getPosts()} />
    </div>
  );
};
