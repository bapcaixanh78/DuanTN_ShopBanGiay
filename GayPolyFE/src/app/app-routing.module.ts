import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './front-end/home/home.component';
import { ProductComponent } from './front-end/product/product.component';
import { CartComponent } from './front-end/cart/cart.component';
import { UserOderComponent } from './front-end/user-oder/user-oder.component';
import { DetailProductComponent } from './front-end/detail-product/detail-product.component';
import { CheckoutComponent } from './front-end/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardPageComponent },
  { path: 'detail-product/:id', component: DetailProductComponent},
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent},
  { path: '', component: HomeComponent },
  { path: 'useroder', component: UserOderComponent },
  { path: 'checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
