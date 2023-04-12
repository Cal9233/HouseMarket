import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <NavBar />
    </Router>
    </>
  );
}

export default App;
