import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }
  uid: string;
  signupUser(email: string, password: string, nome: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((returnedUser) => {
      this.writeUserData(returnedUser.uid, email, true, false, false, false, nome);
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
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
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
  getCurrentUser() {
    //Get the current userID
    var userId = firebase.auth().currentUser.uid;
    //Get the user data
    firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      return new User(snapshot.value().email, snapshot.value().roles, snapshot.value().nome);
    });
  }
}
