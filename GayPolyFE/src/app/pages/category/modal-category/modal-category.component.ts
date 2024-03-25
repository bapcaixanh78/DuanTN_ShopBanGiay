import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { createVoucher, updateVoucher, deleteVoucher, createCategory, updateCategory, deleteCategory } from 'src/app/services';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss']
})
export class ModalCategoryComponent implements OnInit {

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
  });
  ngOnInit(): void {
    this.data = this.dialogData.data;
    this.formStatus = this.dialogData.formStatus;
    if(this.data != null){
      this.form = this.formBuilder.group({
        Name: [this.data.name],
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
    debugger
    this.http.post(createCategory, this.form.value).subscribe((res: any) => {
      if (res != null) {
          this.closePopup(false, "Tạo Mới Thành Công !")
       
      }
      else {
        this.closePopup(true, "Tạo Mới  Không Thành Công !")
      }
    })
  }
  onUpdate = () => {
    this.http.put(updateCategory + this.data.id, this.form.value).subscribe((res: any) => {
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
      .delete(deleteCategory + this.data.id, {
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
