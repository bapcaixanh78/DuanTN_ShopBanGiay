import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { host, getProductById } from 'src/app/services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor( private http: HttpClient,private route: ActivatedRoute)
  { }
  productList: any[] = [];
  host = host;
  cart : any=[];
  countCart:number = 0;
  productByID:any;
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.http.get(getProductById+"?id="+ this.route.snapshot.params['id']).subscribe((res:any) => {
      this.productByID = res;
    })
  }
  linkCart(){
    window.location.href = "/cart"
  }
}
