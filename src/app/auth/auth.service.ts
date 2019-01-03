import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from './user';


@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }
  uid: string;
  signupUser(email: string, password: string, nome: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((returnedUser) => {
      this.writeUserData(returnedUser.uid, email, true, false, false, false, nome);
     // this.log(returnedUser, "registered");
    })
      .catch(
        error => console.log(error)
      )




  }
  getCurrentUserUid() {

    return firebase.auth().currentUser.uid;
  }
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {

          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
            const d = new Date().toTimeString();
            this.log(firebase.auth().currentUser.uid, "logged in",d)
        }

      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    const d = new Date().toString();
    this.log(firebase.auth().currentUser.uid,"logged out",d);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
  writeUserData(userId, email, customer, contentManager, orderManager, clericalWorker, nome) {

    firebase.database().ref('users/' + userId).set({
      nome: nome,
      email: email

    });

    firebase.database().ref('users/' + userId + '/roles').set({
      customer: customer,
      contentManager: contentManager,
      orderManager: orderManager,
      clericalWorker: clericalWorker
    })
  }
  getCurrentUser(): User {
    //Get the current userID
    var userId = firebase.auth().currentUser.uid;
    //Get the user data
    firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      return new User(snapshot.value().email, snapshot.value().roles, snapshot.value().nome);
    });
    return null;
  }
  log(uid , whatUsed: string, d: string) {
 
  
    firebase.database().ref('log/' + "abcd").set({
      user: uid,
      date : d,
      whatIsUsed: whatUsed

    });
  }
  deleteUser(){
    firebase.auth().currentUser.delete();
    this.logout();
  }
}
