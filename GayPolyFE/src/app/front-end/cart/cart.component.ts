import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GetByEmail, SetOderById, createOder, getVoucherCode, host } from 'src/app/services';
import { AuthenService } from 'src/app/services/authen.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private http: HttpClient ,
    private router: Router,
    private  authen : AuthenService
  ) { }
  @ViewChild('content') content: ElementRef;
  checkout:any = false;
  host = host;
  products: any;
  cart : any=[];
  priceSum : number = 0;
  priceOder:number = 0;
  priceSale : number = 0;
  amountProduct: number = 1;
  countCart: number = 0;
  arrDeleted : any =[];
  data:any;
  user:any;
  voucherCode:any;
  voucherStatus:any ="";
  form = new FormBuilder().group({
    UserName: [''],
    PriceOder: [0],
    Description: [''],
    PhoneNumber:[0],
    Address: [''],
    DayOder: [""],
    ListProduct: [""],
    VoucherCode: [""],
    Status: [0],
  });
  ngOnInit(): void {
    this.authen.checkUser();
    var emailuser = localStorage.getItem("User")
    this.http.get(GetByEmail + emailuser).subscribe(res =>{
      this.user = res
    })
    this.data = localStorage.getItem("productlist")
    this.cart = JSON.parse(this.data);
    this.countCart = this.cart.length; 
  
    this.onSumPrice()
  }
  ongetItem(){
    this.data = localStorage.getItem("productlist")
    return this.data
  }
  onPrice(id : number , check : number){
      this.cart =  JSON.parse(this.data); 
    var index = this.cart.findIndex((x:any) => x.id == id);
    var indexItem = this.cart[index];
    const span = document.getElementById("sumprice2");

    if(check == 1){
    if( indexItem.amountProduct > 1) indexItem.amountProduct -= 1;
    localStorage.setItem("productlist", JSON.stringify(this.cart));
   }

   if(check == 2){
    indexItem.amountProduct += 1;
    localStorage.setItem("productlist", JSON.stringify(this.cart));
   }
   this.onSumPrice()
  }


  onSumPrice(price? : any){
    if(this.ongetItem() !=null) this.cart = JSON.parse(this.ongetItem());
    const span = document.getElementById("sumprice2");
    var sumPrice = 0;
    for( var item of this.cart){
      sumPrice += item.price*item.amountProduct;
    }
    this.priceSum = sumPrice;
    if(span) span.innerHTML = `${this.priceSum} VNĐ`;
    localStorage.setItem("price", this.priceSum.toString());

    }


  onPrice2(id : number , check : number){
    this.cart =  JSON.parse(this.ongetItem());
    var sumPrice = document.querySelectorAll("input.sumprice");
    var productPrice = document.querySelectorAll("td.productprice");
    
    var index = this.cart.findIndex((x:any) => x.id == id);
    var amountProduct = parseInt((<HTMLInputElement>sumPrice[index]).value) ;
    var indexItem = this.cart[index];

    if(check == 1){
    if( amountProduct > 1) amountProduct -= 1;
    indexItem.price= indexItem.price*amountProduct;
    if(sumPrice[index]){
      (<HTMLInputElement>sumPrice[index]).value = amountProduct.toString();
      productPrice[index].innerHTML = `${indexItem.price}`;
    }
   }
   if(check == 2){
    amountProduct += 1;
    indexItem.price = indexItem.price*amountProduct;
    if(sumPrice[index]){
      (<HTMLInputElement>sumPrice[index]).value = amountProduct.toString()
      productPrice[index].innerHTML = `${indexItem.price}`;
    }
   }
   console.log(this.cart)
  }
  onAddDelete(id :any){
   var productIndex = document.getElementById(id);
   var Index = this.arrDeleted.findIndex((x:any) => x.id == id)
   var check = productIndex?.getAttribute("class");
  if(check?.includes("boder-red")){
     // số 1 là 1 phần tử 
    // check là vị trí phần tử
    this.arrDeleted.splice(Index,1);
    productIndex?.classList.remove("boder-red");
  }
  else{
    this.arrDeleted.push({"Id":id})
    productIndex?.classList.add("boder-red");
    // productIndex?.setAttribute("class","boder-red")
  }
  console.log(this.arrDeleted)
  }
  onDeleteAll(){
  this.cart = JSON.parse(this.ongetItem());
   for(var e of this.arrDeleted){
    for(var item of this.cart){
      if(e.Id == item.id){
        var Index = this.cart.findIndex((x:any) => x.id == e.Id)
        this.cart.splice(Index,1)
        localStorage.setItem("productlist", JSON.stringify(this.cart));
        this.onSumPrice();
      }
    }
   }
   this.cart = JSON.parse(this.ongetItem());
   this.countCart = this.cart.length
  }
  onSubmit() {
    var arr = JSON.parse(this.ongetItem())
    var arrList = [];
    var productID:any =[];
    var stringD = ""
    for(var i of arr){
      var Obj = {
        "productName":i.name,
        "productID":i.id,
        "amountProduct":i.amountProduct
      };
      productID.push({Id:i.id})
      arrList.push(Obj)
      stringD += `sản phẩm ${i.name} size ${i.size}` 
    } this.form.controls['Description'].setValue(stringD )
    if(this.voucherCode != null){
      this.form.controls['VoucherCode'].setValue(this.voucherCode)
    }
    this.form.controls['ListProduct'].setValue(JSON.stringify(arrList))
    this.form.controls['PriceOder'].setValue(this.priceSum)
    var username = localStorage.getItem("User");
    this.form.controls['UserName'].setValue(username)
    this.http.post(createOder,this.form.value).subscribe((res: any) => {
        this.http.post(SetOderById,productID).subscribe(res =>{
          alert("cảm ơn bạn đã đặt hàng")
          localStorage.removeItem("productlist");
          window.location.href = "/home";
        })
      
    })
    //  this.svOder.postOder(this.userForm.value).subscribe((res:OderModel)=>{
    //   alert("cảm ơn "+ res+" đã đặt hàng")
    //   this.cookie.delete("productlist")
    //   this.router.navigate(['/fullpage'])
    // })
  }
  checkVoucher(event:any){
      console.log(event.target.value)
      this.voucherCode = event.target.value
  }
  useVoucher(){
    this.http.get(getVoucherCode+this.voucherCode).subscribe((res:any)=>{
      console.log(res)
      if(res != null){
        var expiry = res.expiry
        const currentDate = new Date();

        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const targetDate = new Date(expiry);
        if (currentDate.getTime() > targetDate.getTime()) {
          this.voucherStatus = "Voucher Đã Hết Hạn"
          this.voucherCode = null;
        }
        if(res.turnUseVoucher == 0){
          this.voucherStatus = "Voucher Đã Hết Lượt Sử Dụng"
          this.voucherCode = null;
        }
        else{
          this.voucherStatus = "Đã Áp Dụng Voucher giảm" + " " + res.valueVoucher + "%" ;
          this.priceSale=  (this.priceSum * res.valueVoucher)/100;
          this.priceSum = this.priceSum - this.priceSale;
          this.priceOder =  this.priceSum ;
          localStorage.setItem("price", this.priceOder.toString());

        }
 
      }
      else{
        this.voucherStatus = "Voucher Không Hợp Lệ"
        this.voucherCode = null;
      }
    })
  }
  onExport(){
     const doc = new jsPDF();

    // Chụp nội dung HTML bằng html2canvas
    html2canvas(this.content.nativeElement).then((canvas) => {
      // Lấy dữ liệu hình ảnh từ canvas
      const imgData = canvas.toDataURL('image/png');

      // Thêm hình ảnh vào tài liệu PDF
      doc.addImage(imgData, 'PNG', 0, 0, 210, 50);
      doc.save('document.pdf');
    });
  }

}
