import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  login:any = false;
  user:any;
  ngOnInit(): void {
    if(localStorage.getItem("User") != null && localStorage.getItem("UserName") != null){
      this.login = true;
      this.user = localStorage.getItem("UserName")
    }
  }
  logOut(){{
    localStorage.removeItem("User")
    localStorage.removeItem("UserName")
    this.login = false
    this.user = null;
    location.reload();
  }}
}
