import React, { PropTypes } from "react";
import { Link } from 'react-router-dom'



const SignupForm = ({
  onSubmit,
    onChange,
    errors,
    user
}) => (
        <div className="container">
            <form action="/" onSubmit={onSubmit}>
                <fieldset>
                    <legend>Sign Up For We Park</legend>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        {errors.email && <div className="row"><small className="form-control-feedback error">{errors.email}</small></div>}
                        <input className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" type="email" name="email" onChange={onChange} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        {errors.password && <div className="row"><small className="form-control-feedback error">{errors.password}</small></div>}
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="password" placeholder="Password" type="password" name="password" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Retype Password</label>
                        <input className="form-control" id="password2" placeholder="Password" type="password" name="retypePassword" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" id="firstName" type="firstName" name="firstName" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" id="lastName" type="lastName" name="lastName" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input className="form-control" id="address" type="address" name="address" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input className="form-control" id="phoneNumber" type="telephone" name="phoneNumber" onChange={onChange} />
                    </div>

                    <fieldset className="form-group">
                        <legend>User Type</legend>
                        <div className="form-check">
                            <label className="form-check-label ">
                                <input className="form-check-input" name="userType" id="optionsRadios1" value="Seller" onChange={onChange} type="radio" />
                                Seller
                            </label>
                        </div>
                       
                            <label className="form-check-label">
                                <input className="form-check-input" name="userType" id="optionsRadios2" value="Regular" onChange={onChange} type="radio" />
                                Regular User
                            </label>
                    </fieldset>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p> Already has an account?  <Link to='/login'> Log In</Link></p>
                </fieldset>
            </form>
        </div>
       
    );

export default SignupForm;
