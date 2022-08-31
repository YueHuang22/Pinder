import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
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
            <NavLink to='/login' exact={true} activeClassName='active' className='nav-link'>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active' className='nav-link'>
              Sign Up
            </NavLink>
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
