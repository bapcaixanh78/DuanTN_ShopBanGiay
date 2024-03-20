import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { AuthenService } from 'src/app/services/authen.service';
import { ModalComponent } from './modal/modal.component';
import { getOder, getOderId, host } from 'src/app/services';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private admin :AuthenService,
  ){
    this.config = {
      itemsPerPage: 7,
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
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.http.get(getOder).subscribe((res:any) =>{
        this.data = res
        console.log( this.data )
        this.data.forEach((e:any) => {
          e.listProduct = JSON.parse(e.listProduct);
          e.viewNameP = "";
          e.listProduct.forEach((i:any) => {
            e.viewNameP += i.productName + ", "
          })
        });
        console.log(this.data)
    })
  }

  onAdd = () => {
    const dialogRef = this.matDialog.open(ModalComponent,{
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
    var url = getOderId+"?id="+id;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalComponent, {
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
  onDelete = (idDlt: number) => {
    var url = getOderId+"?id="+idDlt;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalComponent, {
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
  pageChangeEvent(event:any){
    this.config.currentPage= event
  }
}