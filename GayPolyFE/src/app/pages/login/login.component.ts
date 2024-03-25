import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetByEmail, ResetPass, createAccount, emailservice, postLogin } from 'src/app/services';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result: any[] = [];
  statusForm:any="login";
  sendMailStatus="";
  codereset : number;
  codeResetForm : number;
  sendMailto:any ="";
  passwordReset:any;
  passwordResetConfom:any;
  constructor(private router: Router, private http: HttpClient, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      UserName: [''],
      PhoneNumber: [],
      Email: [''],
      Password: [''],
      Role: []
    });
  }

  ngOnInit() {
    localStorage.clear()
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post(postLogin, this.loginForm .value).subscribe((data:any) => {
        console.log(data)
        if (data != null) {
          if(data.role == 1 || data.role == 0){
            localStorage.setItem("Admin","taikhoanadmin")
            localStorage.setItem("Role",data.role)
            this.router.navigate(['/admin']);
          }
          if(data.role ==-1){
            alert("tài khoản đã bị vô hiệu hóa")
            localStorage.clear();
            this.router.navigate(['/home']);
          }
          if(data.role == 2){
            localStorage.setItem("UserName",data.userName)
            localStorage.setItem("User",data.email)
            this.router.navigate(['/home']);
          }
        }
        else{
          alert("Sai Tài Khoản Hoặc Mật Khẩu")
        }
      });
    }
  }
  Dangky(){
    this.loginForm.value.role = 2;
    console.log(this.loginForm.value)
    this.http.post(createAccount,this.loginForm.value).subscribe((res:any) =>{
      if(res != null){
        alert("Tạo Tài Khoản Thành Công")
        this.statusForm = 'login'
      }
      else{
        alert("Email hoặc Số Điện Thoại Đã Được Đăng Ký")
      }
    })
  }
  sendEmail() {
    if(this.sendMailto == "" || this.sendMailto == null){
      alert("vui lòng nhập email")

      return
    }
    this.http.get(GetByEmail+this.sendMailto).subscribe( res =>{
      if(res != null){
        var code = "";
        for (let i = 0; i < 6; i += 1) {
          code += (Math.floor(Math.random() * (10 - 0)).toString())
        }
        this.codereset = parseInt(code);
        var obj = {
          email:this.sendMailto,
          teamplate:"Mã Xác Nhận :" + code
        }
        this.http.post(emailservice,obj).subscribe((res:any) =>{
          if(res.status == 1){
            alert("Mã Đã Được Gửi")
            this.sendMailStatus = "Mã Đã Được Gửi"
          }
        })
      } 
      else{
        alert("Email ko tồn tại")
      }
    })
  
  }
  checkCode(){
    if(this.codereset == this.codeResetForm){
      this.statusForm = 'rsmatkhau'
    }
    else{
      alert("Mã OTP Không Chính Xác")
    }
  }
  resetMK(){
    if(this.passwordResetConfom == this.passwordReset){
      var objrs = {
        Email:this.sendMailto,
        Password:this.passwordReset,
        role:null
      }
      this.http.post(ResetPass,objrs ).subscribe(res =>{
        if(res != null){
          alert("Đổi Mật Khẩu Thành Công")
          this.statusForm='login'
        }
        else{
          alert("Đổi Mật Khẩu Thất Bại")
        }
      })
    }
  
  }
}