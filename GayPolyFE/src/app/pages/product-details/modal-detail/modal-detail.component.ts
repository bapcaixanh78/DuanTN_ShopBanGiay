import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { createCategory, updateCategory, deleteCategory, productDetaiCreate, productDetaiDelete, productDetaiUpdate } from 'src/app/services';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {

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
    sizeName: [''],
    quantity: [0],
  });
  ngOnInit(): void {
    console.log(this.dialogData.data)
    this.data = this.dialogData.data;
    this.formStatus = this.dialogData.formStatus;
    if(this.data != null){
      this.form = this.formBuilder.group({
        sizeName: [this.data.sizeName],
        quantity: [this.data.quantity],
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
    this.http.post(productDetaiCreate, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Tạo Mới Thành Công !")
       
      }
      else {
        this.closePopup(true, "Tạo Mới  Không Thành Công !")
      }
    })
  }
  onUpdate = () => {
    this.http.put(productDetaiUpdate + this.data.id, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Cập Nhật Thành Công !")
      
      }
      else {
        this.closePopup(true, "Cập Nhật  Không Thành Công !")
      }
    })
  };
  onDelete() {
    this.http
      .delete(productDetaiDelete + this.data.id, {
      })
      .subscribe({
        next: (res: any) => {
          this.closePopup(false, res.message);
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
          this.message = 'Xóa sản phẩm  thành công';
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
