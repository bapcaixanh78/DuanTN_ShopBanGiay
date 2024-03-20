import { Router } from '@angular/router';
import { getAllProduct, postProduct, uploadImge } from './../../services/index';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  getAllBrands,
  getUserName,
  getProductById,
  getAllCategories,
  getCategoriesByBrandId,
} from 'src/app/services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  addForm: FormGroup;
  userName = '';
  brands: any;
  categories: any;
  selected: number;
  brandId: any;
  message = '';
  cateId: any;
  files:any;
  constructor(
    private http: HttpClient,
    private matdialog: MatDialog,
    public formBuilder: FormBuilder,
    private route: Router,
    private diag: MatDialogRef<ModalAddComponent>
  ) {
    this.addForm = this.formBuilder.group({
      Name: [''],
      Quantity: [0],
      Description: [''],
      Image : [""],
      Price: [0],
      Type: [""],
      VoucherCode: [""],
      Sale: [0],
      Oder: [0],
    });
  }
  // public string? Name { get; set; }
  // public int? Quantity { get; set; }
  // public string? Description { get; set; }
  // public string? Image { get; set; }
  // public double? Price { get; set; }
  // public string? Type { get; set; }
  // public string? ImgID { get; set; }
  // public string? VoucherCode { get; set; }
  // public int? sale { get; set; }
  ngOnInit() {
 
  }

  
  onAdd = () => {
    this.addForm.value.Image = this.files.Type;
    this.http.post(postProduct,this.addForm.value).subscribe(res =>{
      if(res != null){
        const formdata:FormData =new FormData();
        var file :File = this.files.File;
        formdata.append('upload',file, this.files.Type)
        this.http.post(uploadImge,formdata).subscribe((res:any) =>{
          if(res.messenger == "true"){
            this.closePopup(false,"Tạo Mới Sản Phẩm Thành Công !")
          }
          else{
            this.closePopup(true,"Tạo Mới Sản Phẩm Không Thành Công !")
          }
        })
      }
      else{
        this.closePopup(true,"Tạo Mới Sản Phẩm Không Thành Công !")
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
  onBrandChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(typeof id.target.value);
    this.brandId = id.target.value;
    console.log(this.brandId);
    this.http
      .get(getCategoriesByBrandId + id.target.value, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe((res) => {
        this.categories = res;
        // this.brandId = this.categories.brandId;

        console.log('categories: ', this.categories);
      });
  };

  onCategoryChange = (id: any) => {
    // console.log(this.addForm.get('brand'))
    console.log(id.target.value);
    this.cateId = id.target.value;
    console.log('cateId: ', this.cateId);
  };

  reloadComponent() {
    let currentUrl = this.route.url;
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([currentUrl]);
  }

  closePopup(error?: boolean, message?: string) {
    this.diag.close({
      isError: error,
      message: message
    });
  }
}
