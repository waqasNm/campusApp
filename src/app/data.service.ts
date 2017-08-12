import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

 @Injectable()
export class DataService {

  users: FirebaseListObservable<any[]>;
  studentProfile:FirebaseListObservable<any[]>;
  companyProfile:FirebaseListObservable<any[]>;
  jobPost:FirebaseListObservable<any[]>;
  allPosts:FirebaseListObservable<any[]>;
  userProfile: FirebaseObjectObservable<any>;
  userDetails;
  uid;
  stateCompany = false;
  state;
  data;

  constructor(private db: AngularFireDatabase, private af: AngularFireAuth, public router: Router) {
    
    this.studentProfile = this.db.list('/studentProfile'); 
    this.jobPost = this.db.list('/jobPosts');    
   }
 
  addUser = function (user) {
    this.uid = this.af.auth.currentUser.uid; 
    this.users = this.db.list('/users/'+ this.uid);    
    this.users.push(user);
  }

  showUser = function () {
    this.uid = this.af.auth.currentUser.uid; 
    console.log(this.uid);
    this.userProfile = this.db.object('/users/' + this.uid, { preserveSnapshot: true });
    this.userProfile.subscribe(snapshot => {
      snapshot.forEach(snapshotee => {
        console.log(snapshotee.val())
        console.log(snapshotee.val().userType)
        if(snapshotee.val().userType === 'student'){
          console.log('Student Login');
          // this.stateCompany = false;
          this.state = 'student';          
           this.router.navigate(['/student']);
        }else if(snapshotee.val().userType === 'company'){
          console.log('Company login');
          this.state = 'company';
           this.router.navigate(['/company']);
        }else{
          console.log('Àdmin login');
           this.router.navigate(['/admin']);
        }
      })
      
    })
    console.log(this.userProfile);
  }


  addStudentProfile(profile){
    this.studentProfile = this.db.list('/studentProfile');    
    this.studentProfile.push(profile);
    console.log(profile);
  }

  addCompanyProfile(profile){
    this.studentProfile = this.db.list('/companyProfile/'+ this.uid);    
    this.studentProfile.push(profile);
    console.log(profile);

  }

  addPostJob(job){
    this.jobPost = this.db.list('/jobPosts/'+ this.uid);    
    this.jobPost.push(job);
  }


  get demoFunc() : any{
    this.showPost();
    return this.arr;
  }
  arr = [];
  showPost(){
    this.uid = this.af.auth.currentUser.uid; 
    console.log(this.uid);
    this.jobPost = this.db.list('/jobPosts/'+ this.uid, { preserveSnapshot: true });
    this.jobPost
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
        this.data =snapshot.val();
        this.arr.push(this.data);
        console.log(this.arr);
    });
  })
    console.log(this.data);
        console.log(this.arr);
    
  }


  showAllPosts(){  
    this.allPosts = this.db.list('/jobPosts', { preserveSnapshot: true });
    this.allPosts
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
        // this.data =snapshot.val();
        // this.arr.push(this.data);
        // console.log(this.arr);
      });
    })    
  }

}