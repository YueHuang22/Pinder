import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginModal from '../LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import LogoutButton from '../Auth/LogoutButton';
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)

  //onClick fucntions
  function viewHome() {
    history.push('/');
  }

  return (
    <div className='nav-container'>
      <div className='nav-logo-div'>
        <img className='nav-logo' alt="" src="https://i.imgur.com/ayGDHDC.png" onClick={viewHome}></img>
      </div>

      {(!user) && (
        <div className='nav-right-div'>
          <div>
            <LoginModal />
          </div>
          <div>
            <SignUpModal />
          </div>
        </div>
      )}

      {user && (
        <div className='nav-right-div'>
          <div className='nav-login-div'>
            Hi, {user?.firstName}!
          </div>
          <div className='nav-login-div'>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
