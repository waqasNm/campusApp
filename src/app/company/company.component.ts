import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';





@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./company.component.css']
})
export class CompanyComponent implements OnInit {
  form;
  job;
  jobPost;
  constructor(public data:DataService, public ap:AppComponent) { 
    
  }
  
  isTrue = this.ap.isTrue;  
  stds = this.data.studentProfile;
  ngOnInit() {
    this.form = new FormGroup ({
      name: new FormControl(""),
      address: new FormControl(""),
      phone: new FormControl("")
    });
    this.job = new FormGroup ({
      jobName: new FormControl(""),
      description: new FormControl("")
    })
  }

  save(profile){
    this.data.addCompanyProfile(profile);
    this.form.reset();    
  }
  createPost(job){
    this.data.addPostJob(job);
    // console.log(job);
    this.job.reset();    
  }

  

  viewPost(){
    this.jobPost = this.data.demoFunc ;
    // this.data.showPost()
    // this.jobPost = this.data.data;
    // console.log(this.jobPost.value);
    // console.log(this.data.data);
    // console.log(this.jobPost);
  //  const a = this.data.func(this.data.showPost());
  //  console.log(this.data.demoFunc);
  //  this.data.eventCallback$.subscribe(data => {
    // console.log(this.data.showPost());
// });
 
// console.log(a);
 }

}
