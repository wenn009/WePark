import React, { Component } from "react";
import Navbar from "../NavBar";
import { GarageForm } from "./GarageForm";
import {BrowserRouter as router, Redirect } from 'react-router-dom';

export default class GaragePage extends Component {
  constructor() {
    super();

    this.state = {
      isCreated: false,
      garage: {
        stAddress: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        size: "",
        price: ""
      }
    };
  }

  formOnSubmit = event => {
    event.preventDefault();
    let values = this.state.garage;
    console.log(values);
    fetch("http://localhost:8000/garages/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Address: values.stAddress + " " + values.apartment + " " + values.city + " " + values.state,
        Renting_Price: values.price,
        Size: values.size,
        Zip: values.zip
      })
    });
    this.setState({isCreated: true});

    
  };

  garageOnChange = event => {
    const field = event.target.id;
    const garage = this.state.garage;
    garage[field] = event.target.value;
  };


  // Check if the file input is a image file
  isImage = event => {
    
  };

  addImageOnClick = event => {
    console.log("Add image");
  };

  render() {
    if(this.state.isCreated){
      return <Redirect to='/' push={true}/>
    } else{
      return (    
          <div>
            <Navbar />
            <GarageForm
              onChange={this.garageOnChange}
              formOnSubmit={this.formOnSubmit}
              addImageOnClick={this.addImageOnClick}
            />
          </div>
        );
    }
  }
}
