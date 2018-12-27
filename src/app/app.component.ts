import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'product';

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyBm55zsXJ3G2IR4mmUSWlwTmOD0AlxNeSo",
      authDomain: "lapr5-74597.firebaseapp.com",
      databaseURL: "https://lapr5-74597.firebaseio.com",
      projectId: "lapr5-74597",
      storageBucket: "lapr5-74597.appspot.com",
      messagingSenderId: "1051470391729"
    };
    firebase.initializeApp(config);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
