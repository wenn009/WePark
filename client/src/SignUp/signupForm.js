import React, { PropTypes } from 'react';
//import { Link } from 'react-router-dom'


const SignupForm = ({
  onSubmit,
    onChange,
    errors,
    user
}) => (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">Sign Up</h4>
                </div>
                <div className="panel-body">
                    <form className="col-md-12" action="/" onSubmit={onSubmit}>


                        {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
                        <div className="row">
                            <div className="input-group col-md-12 col-sm-12">
                                <span class="input-group-addon" id="basic-addon1">Email</span>
                                <input className="form-control" id="email" type="email" name="email" onChange={onChange} />

                            </div>
                        </div> < br />

                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">Password</span>
                                <input className="form-control" id="password" type="password" name="password" onChange={onChange} />

                            </div>
                        </div> <br />
                        {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">Retype Password</span>
                                <input className="form-control" id="retypePassword" type="password" name="retypePassword" onChange={onChange} />
                            </div>
                        </div> <br />

                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">First Name</span>
                                <input className="form-control" id="firstName" type="firstName" name="firstName" onChange={onChange} />
                            </div>
                        </div> <br />

                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">Last Number</span>
                                <input className="form-control" id="lastName" type="lastName" name="lastName" onChange={onChange} />
                            </div>
                        </div> <br />

                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">Address</span>
                                <input className="form-control" id="address" type="address" name="address" onChange={onChange} />
                            </div>
                        </div> <br />

                        <div className="row">
                            <div className="input-group col-md-12 col-md-12">
                                <span class="input-group-addon" id="basic-addon1">Phone Number</span>
                                <input className="form-control" id="phoneNumber" type="telephone" name="phoneNumber" onChange={onChange} />
                            </div>
                        </div> <br />

                        <div class="row">
                            <div className="input-group col-md-6 col-sm-6">
                                <div class="radio">
                                    <label><input type="radio" name="optradio" />Seller</label>
                                </div>
                            
                                <div class="radio">
                                    <label><input type="radio" name="optradio" checked/>Regular User</label>
                                </div>
                            </div>
                        </div>

                        <div className="row ">
                            <input type="submit" className="btn btn-md btn-primary pull-right btn-signin" value='Log in' />
                        </div>
                        <br />
                        <div className="row">
                            <p className=" pull-right"> New to WePark?  <a href="/signup">Sign Up</a></p>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );


export default SignupForm;