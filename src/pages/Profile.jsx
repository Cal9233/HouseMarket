import React, {useState, useEffect} from 'react';
import { getAuth, updateProfile } from '@firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import {db} from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const {name, email} = formData;

  const onLogOut = () => {
    auth.signOut();
    navigate('/')
  }

  const onSubmit = async () => {
    try{
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name
        });
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name
        });

      }
    }catch(e){
      console.log('error: ', e);
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className='profile'>
      <div className="profileHeader">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button className="logOut" type='button' onClick={onLogOut}>Log Out</button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">
              Personal Details
            </p>
            <p className="changePersonalDetails" onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input 
                type="text" 
                id="name" 
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input 
                type="text" 
                id="email" 
                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile