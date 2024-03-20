import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { createVoucher, updateVoucher, deleteVoucher, createAccount, UpdateAccount, deleteUser } from 'src/app/services';

@Component({
  selector: 'app-modal-account',
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.scss']
})
export class ModalAccountComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private matdialog: MatDialog,
    public formBuilder: FormBuilder,
    private route: Router,
    private diag: MatDialogRef<ModalAddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }
  message: string;
  data:any;
  role:number;
  formStatus:any;
  form = this.formBuilder.group({
    UserName: [''],
    PhoneNumber : [],
    Email: [""],
    role: [],
    Password : [""],
  });
  ngOnInit(): void {
    var string = localStorage.getItem("Role")
    if(string != null){
      this.role = parseInt(string);
    }
    this.data = this.dialogData.data;
    this.formStatus = this.dialogData.formStatus;
    if(this.data != null){
      this.form = this.formBuilder.group({
        UserName: [this.data.userName],
        PhoneNumber : [this.data.phoneNumber],
        Email: [this.data.email],
        role: [this.data.role],
        Password : [this.data.password],
      });
  }
}
  onSave() {
    if(this.data != null){
      this.onUpdate();
    }
    else{
      this.onAdd();
    }
  }
  changeInt(value:any){
    if (typeof value === 'string') {
      return parseInt(value);
    }
    else{
      return value
    }
  }
  onAdd = () => {  
    this.form.value.role = this.changeInt(this.form.value.role);
    this.http.post(createAccount, this.form.value).subscribe((res: any) => {
      console.log(res)
      if (res != null) {
          this.closePopup(false, "Tạo Mới Tài Khoản Thành Công !")
       
      }
      else {
        this.closePopup(true, "Tạo Mới Tài KhoảnKhông Thành Công !")
      }
    })
  }
  onUpdate = () => {
    this.form.value.role = this.changeInt(this.form.value.role);
    this.http.put(UpdateAccount + this.data.id, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Cập Nhật Tài Khoản Thành Công !")
      
      }
      else {
        this.closePopup(true, "Cập Nhật STài KhoảnKhông Thành Công !")
      }
    })
  };
  onDelete() {
    this.http
      .delete(deleteUser + this.data.id, {
      })
      .subscribe({
        next: (res: any) => {
          this.closePopup(false, res.message);
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
          this.message = 'Xóa Tài Khoản không thành công';
          this.closePopup(true, this.message);
          // alert('Cập nhật không thành công');
        },
      });
  }
  reloadComponent() {
    throw new Error('Method not implemented.');
  }
  closePopup(error?: boolean, mess?: string) {
    this.diag.close({
      isError: error,
      message: mess
    });
  }

}
