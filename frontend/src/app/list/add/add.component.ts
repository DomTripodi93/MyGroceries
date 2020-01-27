import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroceryService } from '../grocery.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output() cancel = new EventEmitter<boolean>();
  groceryForm: FormGroup;
  
  constructor(
    private grocServ: GroceryService
  ){}
  
  ngOnInit(){
    this.initForm();
  }
    
  private initForm() {

    this.groceryForm = new FormGroup({
      'item': new FormControl("", Validators.required),
      'department': new FormControl("")
    });
  }
  
  onSubmit(){
    this.grocServ.addGrocery(this.groceryForm.value).subscribe(() => {
      this.grocServ.groceryUpdated.next();
      this.onCancel();
    });
  }

  onCancel(){
    this.cancel.emit(false);
  }

}
