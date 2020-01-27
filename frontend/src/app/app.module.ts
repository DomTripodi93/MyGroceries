import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { ListComponent } from './list/list.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AppRouteModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AddComponent } from './list/add/add.component';
import { EditComponent } from './list/edit/edit.component';
import { GroceryComponent } from './list/grocery/grocery.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    SignoutComponent,
    ListComponent,
    HeaderComponent,
    AddComponent,
    EditComponent,
    GroceryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRouteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
