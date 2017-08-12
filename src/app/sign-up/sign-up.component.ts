import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form;
  constructor(private auth:AuthService, public data:DataService) { }
  // email;
  // password;
  ngOnInit() {
    this.form = new FormGroup ({
      fname: new FormControl(""),
      lname: new FormControl(""),
      email: new FormControl(""),
      userType: new FormControl(""),
      password: new FormControl("")
    })
  }


  signup(user) {
    this.auth.signup(user.email, user.password,user)
    this.form.reset();
    console.log("Signed in");
  }

  

}
