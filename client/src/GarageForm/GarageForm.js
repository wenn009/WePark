import React, { Component } from "react";
import { Form, Text } from "react-form";
import Navbar from "../NavBar";
import "./GarageForm.css";

const ExampleForm = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading text-center">Garage Form</div>
            <div className="panel-body">
              <Form
                validateError={errorValidator}
                validateSuccesss={successValidator}
                asyncValidators={asyncValidators}
              >
                {formApi => (
                  <form onSubmit={formApi.submitForm} id="form">
                    <div className="row">
                      <label htmlFor="Street address">Street Address</label>
                      <div className="row">
                        <Text field={["stAddress", 0]} id="stAddress" />
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="State">State / Province / Region</label>
                      <div className="row">
                        <Text field={["State", 1]} id="State" />
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="Zip">Zip code</label>
                      <div className="row">
                        <Text field={["Zip", 2]} id="Zip" />
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="Renting Price">Renting Price</label>
                      <div className="row">
                        <Text field={["Renting Price", 3]} id="RentingPrice" />
                      </div>
                    </div>
                    <div className="row">
                      <label htmlFor="Size">Size</label>
                      <div className="row">
                        <Text field={["Size", 4]} id="Size" />
                      </div>
                    </div>
                    <div className="row">
                      <button type="" className="mb-4 btn btn-primary" onClick={onAddImage}>Add images</button>
                    </div>
                    <div className="row">
                      <div className="col-md-push-9">
                        <button type="submit" className="mb-4 btn btn-primary" onClick={onSubmit}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const onSubmit = event => {
  console.log("Added to backend");
}

const onAddImage = () => {
  console.log("Add image");
}

const errorValidator = values => {
  return {
    Address:
      !values.Address || values.Address.trim() === ""
        ? "Address is a required field"
        : null
  };
};

const successValidator = (values, errors) => {
  return {
    Address: !errors.Address ? "Awesome! Your address is good to go" : null
  };
};

const doesStateExist = Address =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      // If the Address exist, then return error
    })
  );

const asyncValidators = {
  Address: async Address => {
    const validations = await doesStateExist(Address);
    return validations;
  }
};

export default class GarageForm extends Component {
  constructor() {
    super();

    this.state = {
      Address: "",
      RentingPrice: "",
      Size: ""
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <ExampleForm Address="" RentingPrice="" Size="" />
      </div>
    );
  }
}
