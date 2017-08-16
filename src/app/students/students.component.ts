import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./students.component.css']
})
export class StudentsComponent implements OnInit {
  form;
  constructor(public data:DataService, private db:AngularFireDatabase,private af:AngularFireAuth) {
    this.getJobPosts()
    this.getUserProfile()
   }
  // viewJobs;
  // allposts = this.data.jobPost;
  isTrue; 
  stdProfile(){
    this.isTrue = true
  }
  seeJobs(){
    this.isTrue = false
  }
  
  ngOnInit() {
    this.form = new FormGroup ({
      name: new FormControl(""),
      edu: new FormControl(""),
      grade: new FormControl(""),
      institute: new FormControl(""),      
      phone: new FormControl(""),
      gender: new FormControl("")
    })
    console.log(this.data.jobPost)
  }

  
  save(profile){
    this.data.addStudentProfile(profile);
    this.form.reset();
  }
  uid;
  userProfile:FirebaseObjectObservable<any>;
  currentUser = {};
  getUserProfile(){
    this.uid = this.af.auth.currentUser.uid;
    console.log(this.uid);
    this.userProfile = this.db.object('/studentProfile/' + this.uid, { preserveSnapshot: true })
    this.userProfile.subscribe(snapshots => {
      this.currentUser = snapshots.val();
      console.log(snapshots.key);
      console.log(snapshots.val().name);
      console.log(this.currentUser);
      setTimeout(() => {
        this.form.setValue({
          name: snapshots.val().name,
          edu: snapshots.val().edu,
          grade: snapshots.val().grade,
          institute: snapshots.val().institute,
          phone: snapshots.val().phone,
          gender: snapshots.val().gender
          

        });
      }, 3000)
    })
  }

    demoGetPost:FirebaseListObservable<any>;
    allJobPostKey = [];
    allJobPostVal = [];
  getJobPosts() {

    this.demoGetPost = this.db.list('/jobPosts/', { preserveSnapshot: true });
    this.demoGetPost.subscribe(snapshots => {

      this.allJobPostKey = [];
      this.allJobPostVal = [];

      snapshots.forEach(snapshot => {
      snapshot.forEach(snapshot => {
          console.log(snapshot.hasChildren());
          this.allJobPostKey.push(snapshot.key);
          this.allJobPostVal.push(snapshot.val());
          console.log(this.allJobPostKey);
          console.log(this.allJobPostVal);
        })
      });
    })

  }
  applyForJob : FirebaseObjectObservable<any>;
  apply(i){
    this.applyForJob = this.db.object('jobPosts/'+this.allJobPostVal[i].companyId + '/' + this.allJobPostKey[i]  + '/appliedStudent/' + this.uid);
    this.applyForJob.set(this.form.value);
  }

}
