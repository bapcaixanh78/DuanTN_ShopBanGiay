import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { host, getVoucher, getVoucherId, commentGet, commentGetById, getAllProduct } from 'src/app/services';
import { AuthenService } from 'src/app/services/authen.service';
import { ModalvoucherComponent } from '../voucher/modalvoucher/modalvoucher.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

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
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.http.get(commentGet).subscribe((res:any) =>{
       this.data = res
      this.http.get(getAllProduct).subscribe((resp:any)=>{
          this.data.forEach((x:any) =>{
           var index = resp.findIndex((i:any) => i.id == x.productId)
             x.namep = resp[index].name;
          })
          console.log(this.data)
      })
       

        console.log(this.data)
    })
  }

  // onAdd = () => {
  //   const dialogRef = this.matDialog.open(ModalvoucherComponent,{
  //     data:{
  //       data:null,
  //       formStatus:true,
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('day la thong bao' + JSON.stringify(result.message));
  //     this.message = result.message;
  //     if (result.isError) {
  //       this.toastr.error(this.message);
  //     }
  //     else {
  //       this.toastr.success(this.message);
  //     }
  //     this.getData()
  //   });
  // };
  onUpdate = (id: number) => {
    var url = commentGetById+"?id="+id;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalReviewComponent, {
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
    var url = commentGetById+"?id="+idDlt;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalReviewComponent, {
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
