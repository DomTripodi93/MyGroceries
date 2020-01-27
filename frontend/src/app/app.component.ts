import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  
  public constructor(
    private titleService: Title,
    private auth: AuthService
  ){
    this.auth.checkLogin();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  //Used to set the page title to a specified value
}
