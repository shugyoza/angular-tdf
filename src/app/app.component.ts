import { Component, OnInit } from '@angular/core';

// another import required for this form
import { ViewChild, ElementRef } from '@angular/core';
// required for this form
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Template Driven Forms';

  // define variable to hold the object for initial value
  contact: Contact = {
    firstName: "Steve",
    lastName: "Jobs",
    email: "sjobs@email.com",
    gender: "male",
    isMarried: false,
    country: "2",
    address: {
      city: "Concord",
      street: "Whatever Rd.",
      pinCode: "3423232"
    }
  };

  // define variable to hold the object for second value to show by template reference
  contact2: Contact = {
    firstName: "Albert",
    lastName: "Strong",
    email: "astrong@email.com",
    gender: "male",
    isMarried: false,
    country: "1",
    address: {
      city: "Delhi",
      street: "Whatever Rd.",
      pinCode: "9897878"
    }
  };


  countryList: Country[] = [
    new Country("1", "India"),
    new Country("2", "USA"),
    new Country("3", "England")
  ];

  // getting value from input field by Template reference variable
  @ViewChild('contactForm') contactForm: NgForm | undefined;

  onSubmit(contactForm: any) {
    console.log(contactForm.value);
    /* // prints:
    {
      firstName: 'firstName',
      lastName: 'lastName, ...,
      country: "2",
      address: {
        city: "City",
        street: "street",
        pinCode: "343432"
      }
  } */
  }

  setDefault() {
    // this.contact = this.contact2;
    this.contactForm?.setValue(this.contact2);
  }

  changeCountry() {
    // using two way binding
    // this.contact.country = "1";

    // with template reference method
    this.contactForm?.controls["country"].setValue("1")
  }

  reset(contactForm: NgForm) {
    // also resets the form status like dirty, valid, pristine and touched.
    this.contactForm?.resetForm();
  }

  // modify value with template reference
  patchValue() {
    let obj = {
      firstName: "Rahul",
      lastName: "David",
      email: "rdavid@email.com"
    }
    this.contactForm?.control.patchValue(obj);
  }

  // template reference method to update nested FormGroup by getting a reference to
  // // the nested FormGroup from the controls collection of ngForm
  changeAddress() {
    let obj = {
      city: "Bangalore",
      street: "Brigade Road",
      pinCode: "600100"
    };
    let address = this.contactForm?.controls["address"] as FormGroup;
    address.patchValue(obj);
  }

  ngOnInit() {

    // setting initial value for the fields on component initialization
    this.contact

    // setting value by template reference
    setTimeout(() => {this.contactForm?.setValue(this.contact2)})
  }

}

export class Country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// setting default value starts with defining a model inteface for the form
export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  isMarried: boolean;
  country: string;
  address: {
    city: string;
    street: string;
    pinCode: string;
  }
}
