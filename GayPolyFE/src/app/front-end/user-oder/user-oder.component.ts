import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getByEmail } from 'src/app/services';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-user-oder',
  templateUrl: './user-oder.component.html',
  styleUrls: ['./user-oder.component.scss']
})
export class UserOderComponent implements OnInit {

  constructor(
     private http: HttpClient,
     private authen: AuthenService,
    ) { }
  data:any[]=[]
  user:any
  ngOnInit(): void {
    this.user = this.authen.checkUser();
    this.getData()
  }
  getData(){
    this.http.get(getByEmail+this.user).subscribe((res:any) =>{
        this.data = [res]
        console.log( this.data )
        this.data.forEach((e:any) => {
          e.listProduct = JSON.parse(e.listProduct);
          e.viewNameP = "";
          e.listProduct.forEach((i:any) => {
            e.viewNameP += i.productName + ", "
          })
          console.log(this.data)
        });
        console.log(this.data)
    })
  }
}
