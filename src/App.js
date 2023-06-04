import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import pictureplacelogo from './assets/pictureplacelogo.png';
import Post from './Components/Post.js';
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import ImageUpload from './Components/ImageUpload';


function App() { 
  const [currentForm, setCurrentForm] = useState("login");
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
      return () => {
        listen();
      }
  }, [])

    const userSignOut = () => {
      signOut(auth).then(() => {
        console.log('sign out successful')
      }).catch(error => console.log(error))
      onToggleForm("login")
    }

    useEffect(() => {
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        }
      );
    }, []);

  function onToggleForm(formName) {
    setCurrentForm(formName);
  }

  return (
    authUser ? (
    <div className="app">
      <div className="app-header">
        <img 
          className="app-header-logo"
          src={pictureplacelogo}
          alt="#"
        />
        <div className="app-header-content">
          <h5>User: {authUser.displayName}</h5>
          <button className="signout-button" onClick={userSignOut}>Sign Out</button>
        </div>
      </div>
      <div className="app-posts">
          <>
            {console.log(authUser)}
            {posts.map(({ id, post }) => (
              <Post key={id} postId={id} user={authUser.displayName} username={post.username} caption={post.caption} avatarImage={post.avatarImage} imageURL={post.imageURL}/>
            ))}
          </>

      </div>
          <div className="app-footer">
              <ImageUpload username={authUser.displayName}/>
          </div>
    </div>) : (
      currentForm === "login" ? <Login onToggle={onToggleForm}/> : <Signup onToggle={onToggleForm} />
    )


    // <div className="App">
    //   {
    //     currentForm === "login" ? <Login onToggle={onToggleForm}/> : <Signup onToggle={onToggleForm} />
    //   }
    // </div>
  );
}

export default App;
