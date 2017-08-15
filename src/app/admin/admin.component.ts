import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css','./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public data:DataService, private db:AngularFireDatabase) {
    this.getAllCompProfile();
    this.getAllStdProfile()    
    this.getAllComp();
   }
  // stdData = this.data.studentProfile;

  ngOnInit() {
  }
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
  /*Get All Company Profile*/
    getAllCompanies:FirebaseListObservable<any>;
    allCompanyKey = [];
    allCompanyVal = [];
    allKey = [];
     getAllCompProfile() {

    this.getAllCompanies = this.db.list('/companyProfile/', { preserveSnapshot: true });
    this.getAllCompanies.subscribe(snapshots => {

      this.allCompanyKey = [];
      this.allCompanyVal = [];
      this.allKey = [];
      snapshots.forEach(snapshot => {
        this.allKey.push(snapshot.key);
        console.log(this.allKey);
      snapshot.forEach(snapshot => {

          this.allCompanyKey.push(snapshot.key);
          this.allCompanyVal.push(snapshot.val());
          console.log(this.allCompanyKey);
          console.log(this.allCompanyVal);
        })
      });
    })

  }
  /**/
  /*Get all Users*/
  companyRegistration: FirebaseListObservable<any>;
  allUsersKey = [];
  allUsersVal = [];
  usersKey = [];
  getAllComp(){
    this.companyRegistration = this.db.list('/users/',{ preserveSnapshot:true})
    this.companyRegistration.subscribe(snapshots => {

      this.allUsersKey = [];
      this.allUsersVal = [];
      this.usersKey = [];
      snapshots.forEach(snapshot => {
        this.usersKey.push(snapshot.key);
        // console.log(this.usersKey);
      snapshot.forEach(snapshot => {

          this.allUsersKey.push(snapshot.key);
          this.allUsersVal.push(snapshot.val());
          // console.log(this.allCompanyKey);
          // console.log(this.allCompanyVal);
        })
      });
    })
  }
  /**/

  /*Delet Account and Profile*/
companyProfile:FirebaseListObservable<any>;
stdProfile:FirebaseListObservable<any>;
userid;
  deleteUser(key,name){
    if(name === 'student'){
      console.log("student");
      console.log(key)
      console.log(this.allSKey[key]);
    //   for(var i = 0; i < this.usersKey.length;i++){
    //     if(this.usersKey[i] === this.allSKey[key])
    //     this.userid = this.usersKey[i];
    //     // console.log(this.usersKey[i]);
    // }
    this.stdProfile = this.db.list('/studentProfile/', { preserveSnapshot: true });  
    this.stdProfile.remove(this.allSKey[key]);

    this.companyRegistration = this.db.list('/users/', { preserveSnapshot: true });
    this.companyRegistration.remove(this.allSKey[key]);

    }else if(name === 'company'){
      console.log("company");
      // console.log(key);
      // console.log(this.allKey[key]);
      // console.log(this.usersKey[key]);
    
    for(var i = 0; i < this.usersKey.length;i++){
      if(this.usersKey[i] === this.allKey[key])
      this.userid = this.usersKey[i];
      // console.log(this.usersKey[i]);
      
    }
    this.companyProfile = this.db.list('/companyProfile/', { preserveSnapshot: true });
    this.companyProfile.remove(this.allKey[key]);
    this.companyRegistration = this.db.list('/users/', { preserveSnapshot: true });
    this.companyRegistration.remove(this.userid);
    }else{
      console.log("no name");      
    }
    // this.data.deleteUsers(key);
    // console.log(key);
  }
  /**/   

}
