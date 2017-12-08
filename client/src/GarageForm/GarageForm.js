import React, { Component } from "react";
import "./GarageForm.css";

export const GarageForm = props => {
  return (
    <div className="container">
      <div className="col-md-6" id="centerForm">
        <form onSubmit={props.formOnSubmit}>
          <fieldset>
            <legend id="form-title">Upload New Garage</legend>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                className="form-control"
                id="name"
                aria-describedby="fullName"
                // onChange={props.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Street address</label>
              <input
                className="form-control"
                id="stAddress"
                aria-describedby="streetAddress"
                onChange={props.onChange}
                placeholder="Street and number, P.O box, c/o."
              />
              <input
                className="form-control"
                id="apartment"
                aria-describedby="apartment"
                onChange={props.onChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                id="city"
                onChange={props.onChange}
                aria-describedby="city"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State / Province / Region</label>
              <input
                className="form-control"
                id="state"
                onChange={props.onChange}
                aria-describedby="state"
              />
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip code</label>
              <input
                className="form-control"
                id="zip"
                aria-describedby="zip"
                onChange={props.onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Garage Size</label>
              <input
                className="form-control"
                id="size"
                onChange={props.onChange}
                aria-describedby="size"
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="control-label">Price</label>
                  <div className="input-group">
                    <div className="input-group-addon">$</div>
                    <input
                      className="form-control"
                      id="price"
                      placeholder="Amount"
                      type="text"
                      onChange={props.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <input
              className="form-control-file"
              id="add-image"
              aria-describedby="fileHelp"
              type="file"
            />

            <div className="text-right">
              <button type="submit" className="btn btn-primary right">
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
