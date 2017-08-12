import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';




@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth, public data:DataService ,public router : Router) { }

  signup(email: string, password: string,user ) {
    this.af
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.data.addUser(user);
        this.router.navigate(['/logIn']);
        // console.log(user);

      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .then(value => {
         this.data.showUser();
        //  this.ap.status();
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.af.auth.signOut();
    console.log('logOut');
     this.router.navigate(['/logIn']);
  }

}
