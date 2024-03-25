import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getAllProduct,
  getProductById,
  host,
  productDetaiGet,
  commentGetByEmail,
  commentGet,
  commentCreate,
  commentGetByProductId
} from 'src/app/services';
export interface Comment {
  id: number;
  createdBy: string;
  content: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  productList: any[] = [];
  host = host;
  cart: any = [];
  countCart: number = 0;
  productByID: any;
  galery: any = [];
  imgSrc = '';
  productDetails: any;
  soluong: any;
  optionQatity:any;
  
  formData: any = {};
  comments: Comment = {} as Comment;
  commentGet: Comment[] = [];
  ngOnInit(): void {
    this.getProduct();
    this.getCommentByProductId();
  }

  clickUrl(url: any) {
    this.imgSrc = `${host}/media/${this.productByID.imgSlug}/${url}`;
  }
  getProduct(){
    this.http.get(getProductById+"?id="+ this.route.snapshot.params['id']).subscribe((res:any) => {
      this.productByID = res;
      this.imgSrc = `${host}/media/${ this.productByID.imgSlug}/${this.productByID.image}`
      if( this.productByID.gallery != null){
        this.galery = this.productByID.gallery.split(",")
      }
      this.http.get(productDetaiGet).subscribe((res:any) =>{
          this.productDetails = res.filter((x:any) => x.productId == this.route.snapshot.params['id']);
          this.productDetails.forEach((x:any)=>{
            this.productByID.quantity += x.quantity
          }) 
          this.optionQatity =this.productDetails [0]
      })
    })
  }
  setBtn(item :any){
    this.optionQatity = item
  }
  linkCart(){
    window.location.href = "/cart"
  }

  submitForm() {
    // Log the form data
    this.comments.productId = this.route.snapshot.params['id'];
    this.comments.content = this.formData.comment;
    let useName = localStorage.getItem('UserName') || '';
    let admin = localStorage.getItem('Admin') || '';
    if ((useName != null && useName != '') || (admin != null && admin != '')) {
      this.comments.createdBy = useName;
      // Here you can send the form data to your backend or perform any other action
      this.http.post(commentCreate, this.comments).subscribe((res: any) => {
        if (res) {
          // load page
          window.location.reload();
        } else {
          alert('Bình luận thất bại');
        }
      });
    } else {
      alert('Bạn cần đăng nhập để bình luận sản phẩm');
      // redirect to login page
      window.location.href = '/login';
    } 
  }
  addcart(id : number){
    this.http.get(getProductById+"?id="+this.route.snapshot.params['id']).subscribe((res:any) => {
      console.log(res);
      res.amountProduct = 1;
      res.size = this.optionQatity.sizeName;
      var checkCount = this.cart.length;
      if(this.cart.length != 0){
      var check = this.cart.indexOf((x:any) => x.id == id);
      if(check != 0) this.cart.push(res);
      console.log(this.optionQatity)
      localStorage.setItem("productlist", JSON.stringify(this.cart));
      localStorage.setItem("productlistDetail",this.optionQatity.sizeName);
      // dùng Storage
      // sessionStorage.setItem('producttest',JSON.stringify(this.cart))
      }
      else{
        this.cart.push(res);
        localStorage.setItem("productlistDetail",this.optionQatity.sizeName);
       localStorage.setItem("productlist", JSON.stringify(this.cart));
      }
      // rút gọn
      // var check
      // (this.cart.lenght != 0)? check = this.cart.indexOf((x:any) => x.id == id):this.cart.push(res)
      // if(check != -1) this.cart.push(res);
      this.countCart = this.cart.length;  })
    }

    
    getCommentByProductId(){
      this.http.get(commentGetByProductId+ '?id=' + this.route.snapshot.params['id']).subscribe((res:any) => {
        if(res){
          this.commentGet = res;
        }

      })
    }
  }

  
