import React, { Component } from "react";
import { Form, Text } from "react-form";
import Navbar from "../NavBar";
import "./GarageForm.css";

const ExampleForm = props => {
  return (
    <form>
      <fieldset>
        <div className="form-group">
          <Form
            onSubmit={submittedValues => props.valuesOnChange(submittedValues)}
            // validateError={errorValidator}
            // validateSuccesss={successValidator}
            // asyncValidators={asyncValidators}
          >
            {formApi => (
              <form onSubmit={formApi.submitForm} id="form">
                <div className="row">
                  <label htmlFor="Street address">Street Address</label>
                  <div className="row">
                    <Text field={"stAddress"} id="stAddress" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="State">State / Province / Region</label>
                  <div className="row">
                    <Text field={"State"} id="State" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="City">City</label>
                  <div className="row">
                    <Text field={"City"} id="City" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="Zip">Zip code</label>
                  <div className="row">
                    <Text field={"Zip"} id="Zip" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="Renting Price">Renting Price</label>
                  <div className="row">
                    <Text field={"RentingPrice"} id="RentingPrice" />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="Size">Size</label>
                  <div className="row">
                    <Text field={"Size"} id="Size" />
                  </div>
                </div>
                <div className="row">
                  <button
                    type=""
                    className="mb-4 btn btn-primary"
                    onClick={onAddImage}
                  >
                    Add images
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-push-9">
                    <button type="submit" className="mb-4 btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        </div>
      </fieldset>
    </form>
  );
};

const onAddImage = () => {
  console.log("Add image");
};

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
      submittedValues: {}
    };
  }

  valuesOnChange = submittedValues => {
    this.setState({
      submittedValues
    });

    // Save data to database
    this.saveData();
  };

  saveData() {
    let values = this.state.submittedValues;
    console.log(this.state.submittedValues);
    fetch("http://localhost:8000/garages/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Address: values.stAddress + " " + values.City + " " + values.State,
        Renting_Price: values.RentingPrice,
        Size: values.Size,
        Zip: values.Zip
      })
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <ExampleForm valuesOnChange={this.valuesOnChange} />
      </div>
    );
  }
}
