import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAllProduct, host } from 'src/app/services';

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
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.http.get(getAllProduct).subscribe(res =>{
      this. productList = res as any[];
      console.log( this.productList)
    })
  }
}
