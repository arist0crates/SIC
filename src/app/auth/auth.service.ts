import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { User } from './user';
import { forEach } from '@angular/router/src/utils/collection';
import { stringify } from '@angular/core/src/util';


@Injectable()
export class AuthService {
  token: string;
  public currentuserrole : string;

  constructor(private router: Router) { }
  uid: string;
  signupUser(email: string, password: string, nome: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((returnedUser) => {
      this.writeUserData(returnedUser.uid, email, true, false, false, false, nome);
      // this.log(returnedUser, "registered");
      this.router.navigate(['/signin']);
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
          this.getCurrentUserRoles(firebase.auth().currentUser);
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
          const d = new Date().toTimeString();
          this.log(firebase.auth().currentUser.uid, "logged in", d)
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
    this.log(firebase.auth().currentUser.uid, "logged out", d);
    this.router.navigate(['']);
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

  isAuthenticatedAsCustomer(){
    if(this.token != null && this.currentuserrole == "customer"){
      return true;
    }
  }

  isAuthenticatedAsOrderManager(){
    if(this.token != null && this.currentuserrole == "orderManager"){
      return true;
    }
  }

  isAuthenticatedAsClericalWorker(){
    if(this.token != null && this.currentuserrole == "clericalWorker"){
      return true;
    }
  }

  isAuthenticatedAsContentManager(){
    if(this.token != null && this.currentuserrole == "contentManager"){
      return true;
    }
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
  log(uid, whatUsed: string, d: string) {


    firebase.database().ref('log/' + "abcd").set({
      user: uid,
      date: d,
      whatIsUsed: whatUsed

    });
  }
  deleteUser() {
    firebase.auth().currentUser.delete();
    // User deleted.
    var ref = firebase.database().ref(
      "users/".concat(firebase.auth().currentUser.uid, "/")
    );
    ref.remove();
    this.logout();
  }

  getCurrentUserRoles(user:firebase.User) {
    //Get the user data
    var myUserId = user.uid;
    var userrolesRef = firebase.database().ref('users/' + myUserId).orderByChild('roles');

    let getroles = function () {
      return new Promise((resolve, reject) => {
        userrolesRef.on('value', function (snapshot) {
          var childData = JSON.parse(JSON.stringify(snapshot.val().roles));
          resolve(childData)
        });
      });
    };

    getroles().then(childData => {
      if (childData["clericalWorker"] == true) {
        this.isClericalWorker();
      } else if (childData["contentManager"] == true) {
        this.isContentManager();
      } else if (childData["orderManager"] == true) {
        this.isOrderManager();
      } else{
        this.isCustomer();
      }

      console.log(this.currentuserrole);

    })
  }

  isContentManager() {
    this.currentuserrole = "contentManager"
  }

  isClericalWorker() {
    this.currentuserrole = "clericalWorker"
  }

  isOrderManager() {
    this.currentuserrole = "orderManager"
  }

  isCustomer() {
    this.currentuserrole = "customer"
  }

  getRole(){
    return this.currentuserrole;
  }

}
