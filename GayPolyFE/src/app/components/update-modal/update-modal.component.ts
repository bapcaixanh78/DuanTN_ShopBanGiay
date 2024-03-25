import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { categoryGet, getAllBrands, getCategoriesByBrandId, host, productDetaiGet, uploadGalery, uploadImge } from 'src/app/services';
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
  listFile:any;
  message: string = '';
  files:any;
  galery:any = "";
  detailP:any = [];
  listIdDetail:any =[];
  fomgalery:any;
    host = host;
  constructor(
    private route: Router,
    private http: HttpClient,
    private matDialog: MatDialog,
    private diag: MatDialogRef<UpdateModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if(this.data.gallery != null){
      this.galery = this.data.gallery.split(",")
    }
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
        ProductDetailId:this.data.productDetailId,
        DetailProduct:this.data.detailProduct,
        Gallery : this.data.gallery,
        ListProductDetailId:this.data.listProductDetailId,
    });
    this.http.get(categoryGet).subscribe(res=>{
      this.categories = res;
    })
    console.log(this.data)
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
    if(this.listIdDetail.length > 0 ){
      for(var i = 0 ; i < this.listIdDetail.length ; i++){
        if(i == (this.listIdDetail.length-1) && this.updateForm.value.ListProductDetailId != ""){
          this.updateForm.value.ListProductDetailId += ","+ this.listIdDetail[i].id
        }
        else{
          this.updateForm.value.ListProductDetailId.length += "," + (this.listIdDetail[i].id + ',')
        }
      }
    }
  }
  onUpdate = () => {
   
    if(this.files != null){
      this.updateForm.value.Image = this.files.Type;
    }
    if( this.listFile != null ){
      this.updateForm.value.Gallery = '';
      this.fomgalery = this.uploadFiles();
 

    }
    this.setListProductDetailId()
 
    this.http.put(putProduct+this.productId,this.updateForm.value).subscribe(res =>{
      if(res != null){
        if( this.listFile != null ){
          var fomgalery = this.uploadFiles();
     
          this.http.post(uploadGalery,fomgalery).subscribe(res=>{

          });
        }
        if(this.listFile != null){
          this.http.post(uploadGalery,this.fomgalery).subscribe(res=>{

          });
        }
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
  uploadFiles() {
    
    var files = this.listFile;
    const formData = new FormData();
    this.updateForm.value.Gallery = "";
    for (let i = 0; i < 3; i++) {
      debugger
      var name = formatDate(new Date(), 'yyyyMMddhhmmsssss', 'en')+files[i].name 
        formData.append('files', files[i], name);
        this.updateForm.value.Gallery += (name+ ",")
    }
    return formData
  
}
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
  getImgListValue(event:any){
    this.listFile = event.target.files;
    console.log(this.listFile)
  }
  closePopup(error?: boolean, message?: string) {
    this.diag.close({
      isError: error,
      message: message
    });
  }
}
