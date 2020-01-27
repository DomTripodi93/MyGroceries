import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Grocery } from './grocery.model';

@Injectable({providedIn:'root'})
export class GroceryService {
    groceryUpdated = new Subject();
    groceriesUpdated = new Subject();

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ){}
  
    addGrocery(data: Grocery){
        return this.http.post(
          this.auth.apiUrl + "/grocery/", data
        );
    }

    fetchAllGroceries() {
        return this.http.get(
          this.auth.apiUrl + "/grocery/"
        )
        .pipe(
          map((responseData: Grocery[]) => {
            const groceriesHold: Grocery [] = responseData;
          return groceriesHold;
          })
        )
      }

    deleteGrocery(id){
        return this.http.delete(this.auth.apiUrl + "/grocery/" + id + "/",{
            observe: 'events',
            responseType: 'text'
        });
      }

    changeGrocery(data, id){
        return this.http.put(
            this.auth.apiUrl + "/grocery/" + id + "/", data
        );
    }

}