import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getAllBrands, getCategoriesByBrandId, uploadImge } from 'src/app/services';
import {
  getProductById,
  putProduct,
  getAllCategories,
} from './../../services/index';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  updateForm: FormGroup;
  formData: any = new FormData();
  productData: any;
  productId: number;
  productBrandId: number;
  productCategoryId: number;
  brands: any;
  categories: any;
  selected: number;
  brandId: number;
  message: string = '';
  files:any;
  constructor(
    private route: Router,
    private http: HttpClient,
    private matDialog: MatDialog,
    private diag: MatDialogRef<UpdateModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productId = this.data.id;
    this.updateForm = this.formBuilder.group({
        Name: [this.data.name],
        Quantity: [this.data.quantity],
        Description: [this.data.description],
        Image : [this.data.image],
        Price: [this.data.price],
        Type: [this.data.type],
        VoucherCode: [this.data.voucherCode],
        Sale: [this.data.sale],
    });
    console.log(this.data)
  }

  onUpdate = () => {
    if(this.files != null){
      debugger
      this.updateForm.value.Image = this.files.Type;
    }
    this.http.put(putProduct+this.productId,this.updateForm.value).subscribe(res =>{
      if(res != null){
        if(this.files != null){
          const formdata:FormData =new FormData();
          var file :File = this.files.File;
          formdata.append('upload',file, this.files.Type)
          this.http.post(uploadImge,formdata).subscribe((res:any) =>{
            if(res.messenger == "true"){
              this.closePopup(false,"Cập Nhật Sản Phẩm Thành Công !")
            }
            else{
              this.closePopup(true,"Cập Nhật Sản Phẩm Không Thành Công !")
            }
          })
        }
        this.closePopup(false,"Cập Nhật Sản Phẩm Thành Công !")
      }
      else{
        this.closePopup(true,"Cập Nhật Sản Phẩm Không Thành Công !")
      }
    })
  };
  getImgValue(event:any){
    this.files = {
      Type:"",
      File:null,
      Name:"",
      
    }
    this.files.File = event.target.files[0];
    this.files.Name = formatDate(new Date(), 'yyyyMMddhhmmsssss', 'en')
    this.files.Type = this.files.Name +".png"
    console.log(this.files)
  }
  onCategoryChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(id.target.value);
    this.productCategoryId = id.target.value;
  };

  onBrandChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(id.target.value);
    this.productBrandId = id.target.value;
    this.http
      .get(getCategoriesByBrandId + id.target.value, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.categories = res;
        console.log('categories: ', this.categories);
      });
  };

  reloadComponent() {
    if (this.data.isFromDetail) {
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/dashboard-page']);
    }
    else {
      let currentUrl = this.route.url;
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);
    }

  }

  closePopup(error?: boolean, message?: string) {
    this.diag.close({
      isError: error,
      message: message
    });
  }
}
