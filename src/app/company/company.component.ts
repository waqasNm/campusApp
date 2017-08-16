import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';





@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./company.component.css']
})
export class CompanyComponent implements OnInit {
  form;
  job;
  jobPost:FirebaseListObservable<any>;
  constructor(private db:AngularFireDatabase, private af:AngularFireAuth, public data:DataService, public ap:AppComponent) { 
    this.showPost()  
    this. getAllStdProfile()
  } 
  isTrue = this.ap.isTrue;  
  stds = this.data.studentProfile;
  
      vp;
    pf;
    sp;
    post;
    btn;
    tb;
    cProfile(){
      this.vp=false;
      this.pf = true;
      this.sp = false; 
      this.post = false
    }
    sProfile(){
      this.vp=false;
      this.sp = true; 
      this.pf = false; 
      this.post = false
    }
    createpostJob(){
      this.vp=false;
      this.pf = false; 
      this.sp = false; 
      this.post = true;
      this.btn=true;
      this.tb=false

    }
    postView(){
      this.vp=true; 
      this.pf = false; 
      this.sp = false; 
      this.post = false
    }
  
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

 /*Show Job Posts of a Company */
 uid;
 arr = [];
 showPost(){
    this.uid = this.af.auth.currentUser.uid; 
    console.log(this.uid);
    this.jobPost = this.db.list('/jobPosts/'+ this.uid, { preserveSnapshot: true });
    this.jobPost
      .subscribe(snapshots => {

        this.arr = [];
        
        snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
        // this.data =snapshot.val();
        this.arr.push(snapshot.val());
        console.log(this.arr);
    });
  })
    // console.log(this.data);
        console.log(this.arr);
    
  }
 /**/
   /*Get All Students Profile*/
  getAllStudents:FirebaseObjectObservable<any>;
    allStdKey = [];
    allStdVal = [];
    allSKey = [];
     getAllStdProfile() {

    this.getAllStudents = this.db.object('/studentProfile/', { preserveSnapshot: true });
    this.getAllStudents.subscribe(snapshots => {

      this.allStdKey = [];
      this.allStdVal = [];
      this.allSKey = [];
      snapshots.forEach(snapshot => {
        this.allSKey.push(snapshot.key);
        this.allStdVal.push(snapshot.val());
        console.log(this.allSKey);
        console.log(this.allStdVal);
      // snapshot.forEach(snapshot => {

      //     this.allStdKey.push(snapshot.key);
      //     this.allStdVal.push(snapshot.val());
      //     console.log(this.allStdKey);
      //     console.log(this.allStdVal);
      //   })
      });
    })

  }
  /**/
}
