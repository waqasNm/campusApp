import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/*Angularfire2*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { CompanyComponent } from './company/company.component';
import { AdminComponent } from './admin/admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthService } from './auth.service';
import { DataService } from './data.service';


export const config = {
    apiKey: "AIzaSyD4AE0ONu9T-evfxPwZ1QTArgI5RwPR11E",
    authDomain: "angular4auth-c4e0b.firebaseapp.com",
    databaseURL: "https://angular4auth-c4e0b.firebaseio.com",
    projectId: "angular4auth-c4e0b",
    storageBucket: "angular4auth-c4e0b.appspot.com",
    messagingSenderId: "84822975406"
  };

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CompanyComponent,
    AdminComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path:'',
        component:LogInComponent
      },
      // {
      //   path:'**',
      //   component:LogInComponent
      // },
      {
        path:'admin',
        component:AdminComponent
      },
      {
        path:'company',
        component:CompanyComponent
      },
      {
        path:'student',
        component:StudentsComponent
      },
      {
        path:'signUp',
        component:SignUpComponent
      },
      {
        path:'logIn',
        component:LogInComponent
       }

    ])
  ],
  providers: [AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
