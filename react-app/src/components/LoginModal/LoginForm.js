import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginModal.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'))
    if (data) {
      setErrors(data)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <div className='login-form-container'>
      <form className='login-form' onSubmit={onLogin}>
        <div className='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className='login-form-title'>
          <label htmlFor='email'>Email:</label>
        </div>
        <div>
          <input
            className='login-form-input'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            maxLength='50'
            required
          />
        </div>

        <div className='login-form-title'>
          <label htmlFor='password'>Password:</label>
        </div>
        <div>
          <input
            className='login-form-input'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            maxLength='50'
            required
          />
        </div>

        <div className='login-form-button-container'>
          <button className='login-form-button' type='submit'>Login</button>
          <button className='login-form-button' onClick={loginDemoUser}>Demo User</button>
        </div>
      </form>
    </div>

  );
};

export default LoginForm;
