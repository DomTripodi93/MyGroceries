import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './register/signin/signin.component';
import { SignoutComponent } from './register/signout/signout.component';
import { ListComponent } from './list/list.component';

const appRoutes: Routes = [
    {path: '', component: ListComponent, pathMatch: 'full' },
    {path: 'register', component: RegisterComponent },
    {path: 'login', component: SigninComponent},
    {path: 'logout', component: SignoutComponent},
    {path: "**", redirectTo:"/", pathMatch: "full"}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}