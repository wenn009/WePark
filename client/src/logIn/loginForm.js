import React, { PropTypes } from 'react';
import './loginForm.css';
//import { Link } from 'react-router-dom'


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
          {errors.summary && <div className="form-control-feedback"><p className="error-message error">{errors.summary}</p></div>}
          <div className="form-group">
            <label for="email">Email address</label>
            <input className="form-control" id="email" type="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            {errors.email && <div className="form-control-feedback"><p className="error-message">{errors.email}</p></div>}
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input className="form-control" id="password" type="password" name="password" onChange={onChange} placeholder="Password" />
            {errors.password && <div className="form-control-feedback"><p className="error-message">{errors.password}</p></div>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </fieldset>
      </form>
    </div>
    /*<div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
      <h4 className="panel-title">Login</h4>
      </div>
      <div className="panel-body">
        <form className="col-md-12" action="/" onSubmit={onSubmit}>
          
         
          {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}
          <div className="row">
            <div className="input-group col-md-12 col-sm-12">
            <span className="input-group-addon" id="basic-addon1">Email</span>
              <input className="form-control" id="email" type="email" name="email" onChange={onChange}/>
             
            </div>
          </div> < br />
          {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
          <div className="row">
            <div className="input-group col-md-12 col-md-12">
            <span className="input-group-addon" id="basic-addon1">Password</span>
              <input className="form-control" id="password" type="password" name="password" onChange={onChange}/>
              
            </div>
          </div> <br />
          {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
          <div className="row ">
            <input type="submit" className="btn btn-md btn-primary pull-right btn-signin" value='Log in'/>
          </div>
          <br />
          <div className="row">
            <p className=" pull-right"> New to WePark?  <a href="/signup">Sign Up</a></p>
          </div>
          
        </form>
        </div>
       
      </div>
    </div>*/
  );


export default LoginForm;