import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item/item.models';

import { ShoppinglistService } from '../../services/shopping-list/shopping-list.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private shopping: ShoppinglistService,
  ) {
      this.shoppingList$ = this.shopping
      .getShoppingList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, 
            ...c.payload.val(),
          }));
        });
       }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
