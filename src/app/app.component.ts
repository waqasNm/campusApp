import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css',
              './app.component.css']
})
export class AppComponent {

  isTrue = true ;
  // bool = false;
  stateStd = false;
  stateCompany = false;
  state;

 constructor (public auth:AuthService, public data:DataService, public router: Router){
  //  this.status();
  auth.getLoggedInName.subscribe(name => this.changeName(name));
   
 }
   private changeName(bool: boolean): void {
        this.isTrue = bool;
    }
//  stateCompany = this.data.stateCompany;
  // stateCompany = this.data.stateCompany;
  ngOnInit(){
  }
  nav(bool){
    this.isTrue = bool;
    console.log(this.isTrue);
  }

 
  status(){
    this.state = this.data.state;
    console.log(this.state);
    
      if(this.state === "company"){
        this.stateCompany = true;
        this.stateStd = false;
        console.log(this.state);
      }else if(this.state === "student"){
        this.stateCompany = false;
        this.stateStd = true;
        console.log(this.state);    
    }else{
      this.stateCompany = false;
      this.stateStd = false;
      console.log(this.state);    
    }
  }
  

 logOut(){
   this.auth.logout();
   this.stateCompany = false;
   this.stateStd = false;
   this.isTrue = true;
   
 } 
}
