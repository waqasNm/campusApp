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
  
  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }
  isTrue = false;
  login(user) {
    this.auth.login(user.email, user.password);
    this.isTrue = false;
    this.form.reset();
  }

}
