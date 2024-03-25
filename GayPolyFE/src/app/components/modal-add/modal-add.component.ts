import { Router } from '@angular/router';
import { categoryGet, getAllProduct, postProduct, productDetaiGet, uploadGalery, uploadImge } from './../../services/index';
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
  listFile:any;
  detailP:any = [];
  listIdDetail:any =[];
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
      Gallery : [''],
      ListProductDetailId:[""],
      DetailProduct:null
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
    this.http.get(categoryGet).subscribe(res=>{
      this.categories = res;
    })
    this.http.get(productDetaiGet).subscribe((res:any) =>{
        res.forEach((x:any) => {
          if(x.productId == 0){
            this.detailP.push(x)
          }
        })
    })
  }

  setDetail(size:any){
    if(this.listIdDetail.findIndex((x:any) => x.id ==size.id) == -1){
      this.listIdDetail.push(size)
      console.log(this.listIdDetail,"ok")
    }
    else{
      alert('ko được trùng size')
    }
  }
  setListProductDetailId(){
    if(this.listIdDetail.length > 0){
      for(var i = 0 ; i < this.listIdDetail.length  ; i++){
        debugger
        var numberDefaut = this.listIdDetail.length -1;
        if(i == numberDefaut){
          this.addForm.value.ListProductDetailId += this.listIdDetail[i].id
        }
        else{
          this.addForm.value.ListProductDetailId += (this.listIdDetail[i].id + ',')
        }
      }
    }
    else{
      alert('vui lòng chọn size')
      return;
    }
  }
  onAdd = () => {
    this.setListProductDetailId()
    this.addForm.value.Image = this.files.Type;
    var fomgalery = this.uploadFiles();
    console.log(this.addForm.value)
    this.http.post(postProduct,this.addForm.value).subscribe(res =>{
      if(res != null){
       
        const formdata:FormData =new FormData();
        var file :File = this.files.File;
        formdata.append('upload',file, this.files.Type)
        this.http.post(uploadImge,formdata).subscribe((res:any) =>{
          if(res.messenger == "true"){
            this.http.post(uploadGalery,fomgalery).subscribe(res=>{

            });
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
  uploadFiles() {
    
    var files = this.listFile;
    const formData = new FormData();
  
    for (let i = 0; i < 3; i++) {
      var name = formatDate(new Date(), 'yyyyMMddhhmmsssss', 'en')+files[i].name +".png"
        formData.append('files', files[i],  name);
        this.addForm.value.Gallery += name  + ","
    }
    return formData
  
}

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
  getImgListValue(event:any){
    this.listFile = event.target.files;
    console.log(this.listFile)
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
