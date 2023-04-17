import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(userCredential.user){
        navigate('/');
      }
    } catch(e){
      console.log('error: ', e);
      toast.error('Bad User Credentials');
    }
    
  }

  return (
    <div>
        <div className="pageContainer">
          <header>
            <p className="pageHeader">
              Welcome Back 
            </p>
          </header>
          <main>
            <form onSubmit={onSubmit}>
              <input 
                type="email" 
                className='emailInput'
                placeholder='Email' 
                id='email' 
                value={email}
                onChange={onChange} 
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
              <div className="signInBar">
                <p className="signInText">
                  Sign In
                </p>
                <button className="signInButton">
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
                </button>
              </div>
            </form>
            <OAuth />
            <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
          </main>
        </div>
    </div>
  )
}

export default SignIn