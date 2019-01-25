import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

interface ToDo{

task:string;
priority:number;
id?:string;

}


@IonicPage()
@Component({
  selector: 'page-cafe1',
  templateUrl: 'cafe1.html',
})
export class Cafe1Page {

todoCollection: AngularFirestoreCollection<ToDo>;
	todo: Observable<ToDo[]>;
	  

  constructor(public navCtrl: NavController, public navParams: NavParams, private asf:AngularFirestore ) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad Cafe1Page');
  }

}
