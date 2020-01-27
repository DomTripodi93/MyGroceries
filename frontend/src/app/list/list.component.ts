import { Component, OnInit } from '@angular/core';
import { GroceryService } from './grocery.service';
import { Grocery } from './grocery.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  groceries: Grocery[] = [];
  grocSub: Subscription;
  editMode = false;

  constructor(
    private grocServ: GroceryService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.grocSub = this.grocServ.groceriesUpdated.subscribe(()=>{
      this.getGroceries();
    })
    this.getGroceries();
  }

  onEdit(){
    this.editMode = true;
  }

  onCancel(){
    this.editMode = false;
  }

  getGroceries(){
    this.grocServ.fetchAllGroceries().subscribe((groc)=>{
      this.groceries = groc;
    })
  }

}
