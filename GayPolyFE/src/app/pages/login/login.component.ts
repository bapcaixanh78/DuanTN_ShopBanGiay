import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createAccount, postLogin } from 'src/app/services';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result: any[] = [];
  statusForm:any="login"
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
        if (data != null) {
          if(data.role == 1){
            localStorage.setItem("Admin","taikhoanadmin")
            this.router.navigate(['/admin']);
          }
          if(data.role ==-1){
            alert("tài khoản đã bị vô hiệu hóa")
            localStorage.clear();
            this.router.navigate(['/home']);
          }
          else{
            localStorage.setItem("UserName",data.userName)
            localStorage.setItem("User",data.email)
            this.router.navigate(['/home']);
          }
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
        alert("Email Đã Được Đăng Ký")
      }
    })
  }
}