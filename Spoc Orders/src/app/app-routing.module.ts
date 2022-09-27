import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SystemLayoutComponent } from './system-layout/system-layout.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: '' , redirectTo: "login" , pathMatch: 'full' },
  {path: 'systemlayout' , component: SystemLayoutComponent , children:[
    {path: 'home' , component: HomeComponent}
  ]},
  {path: "orderdetails/:id", component:OrderDetailsComponent},
  {path: '**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
