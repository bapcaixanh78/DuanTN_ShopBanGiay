import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { createOder, deleteOder, updateOder } from 'src/app/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


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
  formStatus:any;
  form = this.formBuilder.group({
    UserName: [''],
    Email: [''],
    PriceOder: [0],
    Description: [''],
    PhoneNumber:[0],
    Address: [''],
    DayOder: [""],
    ListProduct: [""],
    VoucherCode: [""],
    Status: [0],
  });
  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.formStatus = this.dialogData.formStatus;
    if(this.data != null){
      this.form = this.formBuilder.group({
        UserName: [this.data.userName],
        PriceOder: [this.data.priceOder],
        Description: [this.data.description],
        PhoneNumber:[this.data.phoneNumber],
        Address: [this.data.address],
        DayOder: [this.data.dayOder],
        ListProduct: [this.data.listProduct],
        VoucherCode: [this.data.voucherCode],
        Status: [this.data.status],
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
  onAdd = () => {
    this.http.post(createOder, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Tạo Mới Sản Phẩm Thành Công !")
       
      }
      else {
        this.closePopup(true, "Tạo Mới Sản Phẩm Không Thành Công !")
      }
    })
  }

  onUpdate = () => {
    console.log(this.form.value)
    this.http.put(updateOder + this.data.id, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Cập Nhật Sản Phẩm Thành Công !")
      
      }
      else {
        this.closePopup(true, "Cập Nhật Sản Phẩm Không Thành Công !")
      }
    })
  };
  onDelete() {
    this.http
      .delete(deleteOder + this.data.id, {
      })
      .subscribe({
        next: (res: any) => {
          this.closePopup(false, res.message);
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
          this.message = 'Xóa sản phẩm không thành công';
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
