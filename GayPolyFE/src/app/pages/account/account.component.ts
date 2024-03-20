import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { host, getVoucher, getVoucherId, getListUser, getAccountId } from 'src/app/services';
import { AuthenService } from 'src/app/services/authen.service';
import { ModalvoucherComponent } from '../voucher/modalvoucher/modalvoucher.component';
import { ModalAccountComponent } from './modal-account/modal-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private admin :AuthenService,
  ){
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }
  config :any;
  total:any;
   data:any;
   message:any ;
   host = host;
   product:any;
   role:number;
  ngOnInit(): void {
    this.getData()
  }
  getData(){

    var string = localStorage.getItem("Role")
    if(string != null){
      this.role = parseInt(string);
    }
    this.http.get(getListUser).subscribe((res:any) =>{
      if(this.role == 0){
        this.data = res
      }
      else{
        this.data = res.filter((x:any) => x.role != 1)
      }

        console.log(this.data)
    })
  }

  onAdd = () => {
    const dialogRef = this.matDialog.open(ModalAccountComponent,{
      data:{
        data:null,
        formStatus:true,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
      this.getData()
    });
  };
  onUpdate = (id: number) => {
    var url = getAccountId+"?id="+id;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalAccountComponent, {
        data:{
          data:res,
          formStatus:true,
        }
      });
      dialogRef.afterClosed().subscribe(
        (result) => {
          console.log('day la thong bao' + JSON.stringify(result.message));
          this.message = result.message;
          if (result.isError) {
            this.toastr.error(this.message);
          }
          else {
            this.toastr.success(this.message);
          }
          this. getData()
        })
        }
      );
    }
    pageChangeEvent(event:any){

    }
  onDelete = (idDlt: number) => {
    var url = getAccountId+"?id="+idDlt;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalAccountComponent, {
        data:{
          data:res,
          formStatus:false,
        }
      });
      dialogRef.afterClosed().subscribe(
        (result) => {
          console.log('day la thong bao' + JSON.stringify(result.message));
          this.message = result.message;
          if (result.isError) {
            this.toastr.error(this.message);
          }
          else {
            this.toastr.success(this.message);
          }
          this. getData()})
        }
      );
  
  }
}
