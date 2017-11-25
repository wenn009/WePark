import React, { PropTypes } from 'react';
import './loginForm.css';
import { Link } from 'react-router-dom'


const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
    <div className="container">
      <form action="/" onSubmit={onSubmit}>
        <fieldset>
          <legend>Log In</legend>
          {errors.summary && <div className="form-control-feedback"><small className="error-message error">{errors.summary}</small></div>}
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input className="form-control" id="email" type="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            {errors.email && <div className="form-control-feedback"><p className="error-message">{errors.email}</p></div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" name="password" onChange={onChange} placeholder="Password" />
            {errors.password && <div className="form-control-feedback"><p className="error-message">{errors.password}</p></div>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
            <p> New to WePark?  <Link to='/signup'>Sign Up</Link></p>
        </fieldset>
      </form>
    </div> 
  );


export default LoginForm;