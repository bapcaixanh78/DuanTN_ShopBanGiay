import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { postLogin } from 'src/app/services';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result: any[] = [];

  constructor(private router: Router, private http: HttpClient, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      Email: [''],
      Password: ['']
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
            this.router.navigate(['/dashboard-page']);
          }
          else{
            localStorage.setItem("User","taikhoanuser")
            this.router.navigate(['/home']);
          }
        }
      });
    }
  }
}