import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase.config';
import {toast} from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onGoogleClick = async () => {
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            //check for user
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            //if user doesn't exist, create one
            if(!docSnap.exists()){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp()
                })
            }
            navigate('/');
        }catch(e){
            console.log('error: ', e);
            toast.error('Something went wrong');
        }
    };

  return <div className="socialeLogin">
    <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
    <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
    </button>
  </div>
}

export default OAuth