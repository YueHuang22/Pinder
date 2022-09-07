import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      } else {
        history.push("/dogs");
      }
    } else {
      setErrors(["Your password and confirmation password do not match."]);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="signup-errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className="signup-form-title">
          <label>First Name *</label>
        </div>
        <input
          className="signup-form-input"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          maxLength="20"
        ></input>

        <div className="signup-form-title">
          <label>Last Name *</label>
        </div>
        <input
          className="signup-form-input"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          maxLength="20"
        ></input>

        <div className="signup-form-title">
          <label>Email *</label>
        </div>
        <input
          className="signup-form-input"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          maxLength="100"
        ></input>

        <div className="signup-form-title">
          <label>Password *</label>
        </div>
        <input
          className="signup-form-input"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          maxLength="100"
        ></input>

        <div className="signup-form-title">
          <label>Repeat Password *</label>
        </div>
        <input
          className="signup-form-input"
          type="password"
          name="repeat_password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          maxLength="100"
        ></input>

        <div className="signup-form-button-container">
          <button className="signup-form-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
