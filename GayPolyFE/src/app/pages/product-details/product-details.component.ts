import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { host, categoryGet, categoryGetById, productDetaiGet, productGetById, getAllProduct } from 'src/app/services';
import { AuthenService } from 'src/app/services/authen.service';
import { ModalCategoryComponent } from '../category/modal-category/modal-category.component';
import { ModalDetailComponent } from './modal-detail/modal-detail.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
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
   searchName:any;
  ngOnInit(): void {
    this.getData()

  }
  oncheck(event:any){
    var value = event.target.value
    console.log(value)
    if(value != ""){
      this.data=  this.data.filter((x:any) => x.productName.includes(value))
    }
    else{
      this.getData()
    }
  }
  getData(){
    this.http.get(productDetaiGet).subscribe((res:any) =>{
      console.log( res)
      this.data =res
      this.http.get(getAllProduct).subscribe((product:any) =>{
        console.log(product)
        this.data.forEach((x:any) => {
          if(x.productId != 0){
            var index = product.findIndex((i:any) => i.id == x.productId)
            x.productName = product[index].name
          }
          
          })
          
        })
        console.log(this.data,"ok")
      })     
  }

  onAdd = () => {
    const dialogRef = this.matDialog.open(ModalDetailComponent,{
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
    var url = productGetById+"?id="+id;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalDetailComponent, {
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
    var url = productGetById+"?id="+idDlt;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(ModalDetailComponent, {
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
