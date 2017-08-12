import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./students.component.css']
})
export class StudentsComponent implements OnInit {
  form;
  constructor(public data:DataService) { }
  // viewJobs = this.data.jobPost;
  viewJobs;
  ngOnInit() {
    this.form = new FormGroup ({
      name: new FormControl(""),
      edu: new FormControl(""),
      grade: new FormControl(""),
      phone: new FormControl(""),
      gender: new FormControl("")
    })
    console.log(this.data.jobPost)
  }

  jobs(){
    this.viewJobs = this.data.showAllPosts();
    console.log(this.viewJobs);
  }
  save(profile){
    this.data.addStudentProfile(profile);
    this.form.reset();
    // console.log(profile);
  }

}
