import { GithubAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup ,signOut} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const GithubSingIn = () => {
    const [user, setUser] = useState(null);
    const provider = new GithubAuthProvider();
    const auth = getAuth(app);
    const handelGithubSingIn = () =>{
        signInWithPopup(auth, provider).then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        }).catch(error =>{
            console.log(error);
        })
    }

    const handelGithubSingOut = () =>{
        signOut(auth).then(() => {
            setUser(null);
          }).catch((error) => {
            console.log(error);
          });
          
    }



    return (
        <div>
            {
                user ? <button style={{background:"red"}} onClick={handelGithubSingOut}>GitHub SingOut</button> : 
                <button style={{background:"green"}} onClick={handelGithubSingIn}>GitHub SingIn</button>
            }
            {
                user && <div>
                    <h1>Name: {user.displayName}</h1>
                    <img src={user.reloadUserInfo.photoUrl} alt="" style={{width:"50px" , height:"50px"}} />
                </div>
            }
            
        </div>
    );
};

export default GithubSingIn;