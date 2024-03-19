import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAllProduct, getProductById, host } from 'src/app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor( private http: HttpClient,)
   { }
  productList: any[] = [];
  host = host;
  cart : any=[];
  countCart:number = 0;
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.http.get(getAllProduct).subscribe(res =>{
      this. productList = res as any[];
      console.log( this.productList)
    })
  }
  linkCart(){
    window.location.href = "/cart"
  }
  addcart(id : number){
    this.http.get(getProductById+"?id="+id).subscribe((res:any) => {
      console.log(res);
      res.amountProduct = 1;
      var checkCount = this.cart.length;
      if(this.cart.length != 0){
      var check = this.cart.indexOf((x:any) => x.id == id);
      if(check != 0) this.cart.push(res);
      localStorage.setItem("productlist", JSON.stringify(this.cart));
      // dùng Storage
      // sessionStorage.setItem('producttest',JSON.stringify(this.cart))
      }
      else{
        this.cart.push(res);
       localStorage.setItem("productlist", JSON.stringify(this.cart));
      }
      // rút gọn
      // var check
      // (this.cart.lenght != 0)? check = this.cart.indexOf((x:any) => x.id == id):this.cart.push(res)
      // if(check != -1) this.cart.push(res);
      this.countCart = this.cart.length;  

    });
  }
}
