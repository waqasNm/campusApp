import { Injectable,EventEmitter,Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataService } from './data.service';
import { Router } from '@angular/router';
// import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {

   @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  userState;
  constructor(private af: AngularFireAuth, public data:DataService ,public router : Router) {
    // this.userState = af.authState;
    // console.log(this.userState);
   }

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
  
  isTrue;
  login(email: string, password: string): Observable<boolean> {
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .then(value => {
         this.data.showUser();
         this.isTrue = false;                   
          this.getLoggedInName.emit(this.isTrue);
            // return true;
        //  this.ap.status();
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
      return this.isTrue;
  }

  logout() {
    this.af.auth.signOut();
    console.log('logOut');
     this.router.navigate(['/logIn']);
  }


  deleteAccount(){
  //   this.af.auth
  //     .first()
  //     .subscribe(authState => {
  //       console.log(authState);
  //       authState.auth.delete()
  //         .then(_ => console.log('deleted!'))
  //         .catch(e => console.error(e))
  //     });
  
  }

}
