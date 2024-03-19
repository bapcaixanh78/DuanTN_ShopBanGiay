import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { createOder, updateOder, deleteOder, createVoucher, updateVoucher, deleteVoucher } from 'src/app/services';

@Component({
  selector: 'app-modalvoucher',
  templateUrl: './modalvoucher.component.html',
  styleUrls: ['./modalvoucher.component.scss']
})
export class ModalvoucherComponent implements OnInit {

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
    Name: [''],
    Description: [''],
    Code: [""],
    ValueVoucher: [0],
    TurnUseVoucher: [0],
    ExpiryView:[""],
    Expiry:[],
  });
  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.formStatus = this.dialogData.formStatus;
    if(this.data != null){
      var day = this.data.expiry;
      day = formatDate(this.data.expiry,"yyyy-MM-dd","en-us")
      this.form = this.formBuilder.group({
        Name: [this.data.name],
        Description: [this.data.description],
        Code: [this.data.code],
        ValueVoucher: [this.data.valueVoucher],
        TurnUseVoucher: [this.data.turnUseVoucher],
        ExpiryView:[day],
        Expiry:[this.data.expiry],
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
    this.onSetTime()
   
    this.http.post(createVoucher, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Tạo Mới Sản Phẩm Thành Công !")
       
      }
      else {
        this.closePopup(true, "Tạo Mới Sản Phẩm Không Thành Công !")
      }
    })
  }
  onSetTime(){
    this.form.value.Expiry = new Date( this.form.value.ExpiryView)
    this.form.value.ExpiryView = formatDate(this.form.value.Expiry,"dd/MM/yyyy HH:ss","en-us")
  }
  onUpdate = () => {
    this.onSetTime()
    this.http.put(updateVoucher + this.data.id, this.form.value).subscribe((res: any) => {
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
      .delete(deleteVoucher + this.data.id, {
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
