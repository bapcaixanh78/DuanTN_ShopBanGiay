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
  {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }
  config: any;
  total = 0;
  productList: any[] = [];
  host = host;
  cart : any=[];
  countCart:number = 0;
  rangValue :any ;
  searchName:any ;
  searchSelect:any;
  remember :any ;
  ngOnInit(): void {
    this.getProduct()
  }
  pageChangeEvent(event:any){
    this.config.currentPage= event
  }
  getProduct(){
    this.http.get(getAllProduct).subscribe(res =>{
      this. productList = res as any[];
      this.remember = this. productList ;
      console.log( this.productList)
    })
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
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
  changeValue(event:any){
    console.log(event.target.value)
  }
  serachFilter(){
    // rangValue :any ;
    // searchName:any ;
    // searchSelect:any;
    if(this.searchName != undefined){
      this.productList =  this.productList.filter(x => x.name.includes(this.searchName))
    }
    console.log(this.productList)

    if(this.searchSelect != undefined){
      if(this.searchSelect == "1"){
      this.productList.sort((a:any,b:any) => a.price - b.price)
      }
      if(this.searchSelect == "2"){
      this.productList.sort((a, b) => b.price - a.price)
      }
    }
    if(this.rangValue != undefined ){
      this.productList =  this.productList.filter(x => x.price > 0 && x.price <= this.rangValue)
    }
  }
  reset(){
    this.productList = this.remember;
  }
}
