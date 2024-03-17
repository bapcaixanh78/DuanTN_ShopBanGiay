import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './front-end/home/home.component';
import { ProductComponent } from './front-end/product/product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardPageComponent },
  { path: 'detail-page/:id', component: DetailPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
