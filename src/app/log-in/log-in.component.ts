import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./log-in.component.css']
})
export class LogInComponent implements OnInit {
 form;
  constructor(private auth:AuthService, public data:DataService) { }
  // email;
  // password;
  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(""),
      // userType: new FormControl(""),
      password: new FormControl("")
    })
  }
  isTrue = false;
  login(user) {
    this.auth.login(user.email, user.password);
    // this.data.showUser();
    this.isTrue = true;
    this.form.reset();
    // this.email = this.password = '';    
  }

}
