import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProductComponent} from "./components/add-product/add-product.component";
import {ServicesListComponent} from "./components/services-list/services-list.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'add-service', component: AddProductComponent
  },
  {
    path: 'services', component: ServicesListComponent
  },
  {
    path : 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
