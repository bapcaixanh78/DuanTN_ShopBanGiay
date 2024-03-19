import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { MaterialExampleModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './front-end/home/home.component';
import { ProductComponent } from './front-end/product/product.component';
import { OrderManagementComponent } from './pages/order-management/order-management.component';
import { ModalComponent } from './pages/order-management/modal/modal.component';
import { CartComponent } from './front-end/cart/cart.component';
import { CheckoutComponent } from './front-end/checkout/checkout.component';
import { UserOderComponent } from './front-end/user-oder/user-oder.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { ModalvoucherComponent } from './pages/voucher/modalvoucher/modalvoucher.component';
import { AccountComponent } from './pages/account/account.component';
import { ModalAccountComponent } from './pages/account/modal-account/modal-account.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    DetailPageComponent,
    HeaderComponent,
    FooterComponent,
    UpdateModalComponent,
    DeleteModalComponent,
    ModalAddComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    OrderManagementComponent,
    ModalComponent,
    CartComponent,
    CheckoutComponent,
    UserOderComponent,
    VoucherComponent,
    ModalvoucherComponent,
    AccountComponent,
    ModalAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
