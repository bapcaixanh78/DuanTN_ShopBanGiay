import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { getDateString, getAllProduct, host, getProductById, categoryGet, productDetaiGet } from 'src/app/services';
import { UpdateModalComponent } from './../../components/update-modal/update-modal.component';
import { DeleteModalComponent } from './../../components/delete-modal/delete-modal.component';
import { ModalAddComponent } from './../../components/modal-add/modal-add.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenService } from 'src/app/services/authen.service';
import { ModalDetailComponent } from '../product-details/modal-detail/modal-detail.component';

interface defineDataCsv {
  name: string;
  quantity: number;
  userCreate: string;
  createDate: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  codeTable:number = 1;
  search = '';
  host = host;
  message = '';
  pathQuery = '';
  config: any;
  total = 0;
  valueSortName = 0;
  valueSortDate = 0;
  initialSuggestion: string[] = [];
  suggestion: string[] = [];
  data: any[] = [];
  dataTmp: any[] = [];
  exportResult: defineDataCsv[] = [];
  resResult: any[] = [];
  category:any=[];
  detailP:any;
  rangValue :any ;
  searchName:any ;
  searchSelect:any;
  remember :any ;
  input :number ;
  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private admin :AuthenService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.total,
    };
  }

  ngOnInit(): void {
    this.admin.checkAdmin()
    this.getProduct();

  }
  GetDetail(id:any){
    this.input = id
    this.codeTable = 8;
  }
  getProduct(){
    this.http.get(getAllProduct).subscribe(res =>{
      this.data = res as any[];
      this.remember =  this.data ;
      if(this.codeTable == 5){
        this.data.sort((a:any,b:any)=> b.oder - a.oder)
      }
      this.http.get(categoryGet).subscribe(res =>{
        this.category = res;
      })
      this.http.get(productDetaiGet).subscribe((res:any) =>{
        console.log( res)
          this.detailP = res
      })
     
      console.log(this.data )
    })
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
 
  onSize(){
    const dialogRef = this.matDialog.open(ModalDetailComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
      this.getProduct()
    });
  }
  Logout(){
    this.admin.Logout()
  }
  changeTable(number:number){
    this.codeTable = number
    this. getProduct();
  }
  serachFilter(){
    // rangValue :any ;
    // searchName:any ;
    // searchSelect:any;
    if(this.searchName != undefined){
      this.data =  this.data.filter(x => x.name.includes(this.searchName))
    }
    console.log(this.data)

    if(this.searchSelect != undefined){
      if(this.searchSelect == "1"){
      this.data.sort((a:any,b:any) => a.price - b.price)
      }
      if(this.searchSelect == "2"){
      this.data.sort((a, b) => b.price - a.price)
      }
    }
    if(this.rangValue != undefined ){
      this.data=  this.data.filter(x => x.price > 0 && x.price <= this.rangValue)
    }
  }
  reset(){
    this.data = this.remember;
  }
  changeFormatDate = (value: string) => {
    let newDate = new Date(value);
    // console.log(newDate.toLocaleString());
    return getDateString(newDate.toLocaleString());
    // return value
  };
  changeValue(event:any){
    console.log(event.target.value)
  }
  onKeyPress = (key: any, search: string) => {
    if (key.keyCode === 13) {
      this.search = search;
      this.pathQuery = '?Keyword=' + search;

      this.http
        .get(getAllProduct + this.pathQuery, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .subscribe((res) => {
          this.resResult = [res];

          this.data = this.resResult[0].items;
          this.config.totalItems = this.data.length;
        });
    }
  };
  pageChangeEvent(event:any){
    this.config.currentPage= event
  }
  onExport = () => {
    var options = {
      title: '',
      fieldSeparator: ';',
      showLabels: true,
      showTitle: true,
      noDownload: false,
      headers: ['Tên sản phẩm', 'Số lượng', 'Người tạo', 'Thời gian tạo'],
    };

    this.exportResult = [];
    this.data.forEach((element) => {
      this.exportResult.push({
        name: element.name,
        quantity: element.quantity,
        userCreate: element.userCreate,
        createDate: this.changeFormatDate(element.createDate),
      });
    });
    new AngularCsv(this.exportResult, 'Data File', options);
    this.toastr.success("Xuất thành công");
  };

  onNameSort = () => {
    switch (this.valueSortName) {
      case 0:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=name_asc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=name_asc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName++;
        break;
      case 1:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=name_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=name_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName++;
        break;
      case 2:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortName = 0;
        break;
    }
  };

  onDateSort = () => {
    switch (this.valueSortDate) {
      case 0:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_asc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_asc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortDate++;
        break;
      case 1:
        if (this.search === '') {
          this.pathQuery = '?SortOrder=date_desc';
        } else {
          this.pathQuery = '?Keyword=' + this.search + '&SortOrder=date_desc';
        }

        this.http
          .get(getAllProduct + this.pathQuery, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          })
          .subscribe((res) => {
            this.resResult = [res];

            this.data = this.resResult[0].items;
          });

        this.valueSortDate = 0;
        break;
    }

    return this.data;
  };

  onRowClick = (id: number) => {
    this.router.navigate(['/detail-page', id]);
  };

  onAdd = () => {
    const dialogRef = this.matDialog.open(ModalAddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
      this.getProduct()
    });
  };

  onUpdate = (id: number) => {
    var url = getProductById+"?id="+id;
    this.http.get(url).subscribe((res:any) =>{
      const dialogRef = this.matDialog.open(UpdateModalComponent, {
        data: res
      });
      dialogRef.afterClosed().subscribe(
        (result) => {
          console.log('day la thong bao' + JSON.stringify(result.message));
          this.message = result.message;
          if (result.isError) {
            this.toastr.error(this.message);
          }
          else {
            this.toastr.success(this.message);
          }
          this.getProduct()
        }
      );
    })
  
  };

  onDelete = (idDlt: number) => {
    const dialogRef = this.matDialog.open(DeleteModalComponent, {
      data: {
        id: idDlt,
        isFromDetail: false
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('day la thong bao' + JSON.stringify(result.message));
      this.message = result.message;
      if (result.isError) {
        this.toastr.error(this.message);
      }
      else {
        this.toastr.success(this.message);
      }
    });
  };
}
