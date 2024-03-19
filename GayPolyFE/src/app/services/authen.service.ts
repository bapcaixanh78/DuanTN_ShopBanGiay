import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor( private router: Router,) {}

  checkAdmin(){
    if (localStorage.getItem('Admin') == null) { 
        if(localStorage.getItem('User')!=null){
          alert("Bạn Không có quyền truy cập")
          this.router.navigate(['/home']);
        }
        else{
          this.router.navigate(['/login']);
        }
    } 
  }
  checkUser(){
    if(localStorage.getItem('User')!=null){
      return localStorage.getItem('User')
    }
    else{
      this.router.navigate(['/login']);
      return null;
    }
  }
  Logout(){
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
