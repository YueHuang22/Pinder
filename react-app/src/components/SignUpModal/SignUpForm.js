import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [socialUrl, setsocialUrl] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password, imageUrl, socialUrl));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Your password and confirmation password do not match."]);
    }
  };


  return (
    <div className='signup-form-container'>
      <form className='signup-form' onSubmit={onSignUp}>
        <div className='signup-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className='signup-form-title'><label>First Name:</label></div>
        <input
          className='signup-form-input'
          type='text'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        ></input>

        <div className='signup-form-title'><label>Last Name:</label></div>
        <input
          className='signup-form-input'
          type='text'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        ></input>

        <div className='signup-form-title'> <label>Email:</label></div>
        <input
          className='signup-form-input'
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        ></input>

        <div className='signup-form-title'><label>Password:</label></div>
        <input
          className='signup-form-input'
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        ></input>

        <div className='signup-form-title'> <label>Repeat Password:</label></div>
        <input
          className='signup-form-input'
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>

        <div className='signup-form-title'> <label>Profile Picture:</label></div>
        <input
          className='signup-form-input'
          type='text'
          onChange={(e) => setimageUrl(e.target.value)}
          value={imageUrl}
        ></input>

        <div className='signup-form-title'><label>Your social account:</label></div>
        <input
          className='signup-form-input'
          type='text'
          onChange={(e) => setsocialUrl(e.target.value)}
          value={socialUrl}
        ></input>
        <div className='signup-form-button-container'>
          <button className='signup-form-button' type='submit'>Sign Up</button>
        </div>
      </form>
    </div>

  );
};

export default SignUpForm;
