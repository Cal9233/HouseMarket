import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from '@firebase/firestore';
import {db} from '../firebase.config';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const {name, email, password} = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/');
    } catch(e){
      console.log('error: ', e);
    }
  }

  return (
    <div>
        <div className="pageContainer">
          <header>
            <p className="pageHeader">
              Welcome!
            </p>
          </header>
          <main>
            <form onSubmit={onSubmit}>
            <input 
                type="text" 
                className='nameInput'
                placeholder='Name' 
                id='name' 
                value={name}
                onChange={onchange} 
              />
              <input 
                type="email" 
                className='emailInput'
                placeholder='Email' 
                id='email' 
                value={email}
                onChange={onchange} 
              />
              <div className="passwordInputDiv">
                <input 
                  type={showPass ? 'text' : 'password'} 
                  className="passwordInput" 
                  id='password'
                  value={password}
                  placeholder='Password'
                  onChange={onChange}
                />
                <img
                  src={visibilityIcon}
                  alt='Show Password'
                  className='showPassword'
                  onClick={() => setShowPass((prevState) => !prevState)}
                />
              </div>
              <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
              <div className="signUpBar">
                <p className="signUpText">
                  Sign Up
                </p>
                <button className="signUpButton">
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button>
              </div>
            </form>

            <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
          </main>
        </div>
    </div>
  )
}

export default SignUp