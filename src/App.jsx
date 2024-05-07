import './App.css'
import { getAuth } from "firebase/auth";
import app from './firebase/firebase.init';
import { GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';



function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const handelGoogleSigninUser = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handelGoogleSignOut = () =>{
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.log(error);
    });
  }



  return (
    <> 
      <div style={{display:"flex", flexDirection:"column"}}>
        <button style={{marginBottom:"50px"}}><NavLink to="/github-sing-in">Go GitHub SingIn</NavLink></button>
      {
        user ? <button style={{ background: 'red' }} onClick={handelGoogleSignOut}>Sign Out</button> : 
        <button style={{ background: 'green' }} onClick={handelGoogleSigninUser}>SignIn</button>
      }
      {
        user && <div>
          <h1>Name: {user.displayName}</h1>
          <img src={user.reloadUserInfo.photoUrl} alt="" style={{ width: "50px", height: "50px" }} />
        </div>
      }
      </div>
    </>
  )
}

export default App
