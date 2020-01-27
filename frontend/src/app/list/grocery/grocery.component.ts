import { Component, OnInit, Input } from '@angular/core';
import { GroceryService } from '../grocery.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  @Input() grocery
  editMode = false;

  constructor(
    private grocServ: GroceryService
  ) { }

  ngOnInit() {
  }

  onEdit(){
    this.editMode = true;
  }

  onCancel(){
    this.editMode = false;
  }

  onDelete(id){
    if (confirm("Are you sure you want to delete " + this.grocery.item + "?")){ 
      this.grocServ.deleteGrocery(id).subscribe(()=>{
        setTimeout(()=>{this.grocServ.groceriesUpdated.next()},50)}
      );
    }
  }

}
