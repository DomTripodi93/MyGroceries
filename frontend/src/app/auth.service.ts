import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { User } from './register/user.model';
import { Signin } from './register/signin/signin.model';

@Injectable({providedIn:'root'})
export class AuthService {
  token = '';
  user = '';
  name = '';
  isAuthenticated = true;
  authApiUrl = 'http://localhost:5000/api';
  apiUrl = 'http://localhost:5000/api/' + localStorage.getItem('id');
  authChanged = new Subject();

  constructor(
      private http: HttpClient
  ){}
  
  logout(){
    this.user = '';
    this.token = '';
    this.name = '';
    this.isAuthenticated = false;
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.authChanged.next();
  };

  registerUser(data: User){
    return this.http.post(
      this.authApiUrl + '/auth/register',
      data
    );
  };

  signinUser(data: Signin){
    return this.http.post(
      this.authApiUrl + '/auth/login',
      data,
      {
        observe: 'response'
      }
    );
  };

  getUserDetails(){
    return this.http.get(
      this.authApiUrl + "/user/" + this.user
    );
  };

  splitJoin(machine: string){
    let machineHold1: string;
    let machineHold2 = machine.split(" ");
    machineHold1 = machineHold2.join("-")
    machine = machineHold1
      return machine;
  }

  rejoin(machine){
    let machineHold1 = machine;
    let machineHold2 = machineHold1.split("-");
    machineHold1 = machineHold2.join(" ")
    machine = machineHold1
      return machine;
  }

}