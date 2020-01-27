import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { Grocery } from '../grocery.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() cancel = new EventEmitter<boolean>();
  @Input() grocery: Grocery
  editGroceryForm: FormGroup;
  
  constructor(
    private grocServ: GroceryService
  ) { }

  ngOnInit() {
    this.grocServ.groceryUpdated.subscribe(()=>{
      this.onSubmit();
    })
    this.initForm();
  }


  private initForm() {
    this.editGroceryForm = new FormGroup({
      'item': new FormControl(this.grocery.item)
    });
  }

  onSubmit(){
    if (this.grocery.item != this.editGroceryForm.value.item){
      this.changeGrocery();
    } 
  }

  changeGrocery(){
    this.grocServ.changeGrocery(this.editGroceryForm.value, this.grocery.id).subscribe();
    this.grocServ.groceriesUpdated.next();
    this.onCancel();
  }

  submitAll(){
    this.grocServ.groceryUpdated.next();
  }

  onCancel(){
    this.cancel.emit(false);
  }
}
