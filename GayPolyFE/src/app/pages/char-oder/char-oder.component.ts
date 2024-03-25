import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { getOder } from 'src/app/services';

@Component({
  selector: 'app-char-oder',
  templateUrl: './char-oder.component.html',
  styleUrls: ['./char-oder.component.scss']
})
export class CharOderComponent implements OnInit {

  listChart: any = []
  listPriceByMonth: any =
    [
      {
        value: 1,
        price: 0
      },
      {
        value: 2,
        price: 0
      },
      {
        value: 3,
        price: 0
      },
      {
        value: 4,
        price: 0
      },
      {
        value: 5,
        price: 0
      },
      {
        value: 6,
        price: 0
      },
      {
        value: 1,
        price: 0
      },
      {
        value: 7,
        price: 0
      },
      {
        value: 8,
        price: 0
      },
      {
        value: 9,
        price: 0
      },
      {
        value: 10,
        price: 0
      },
      {
        value: 11,
        price: 0
      },
      {
        value: 12,
        price: 0
      },
    ]
  listYear: any = []
  yearNow: any = formatDate(new Date(), 'yyyy', 'en-us')
  constructor(private http: HttpClient,) { }
  ngOnInit(): void {
    this.getData()
 
  }
  getData(){

    this.http.get(getOder).subscribe((res: any) => {
      res.forEach((e: any) => {
        var day = e.dayOder.split(" ")[0];
        e.month = day.split('/')[1]
        e.year = day.split('/')[2]
        if (this.listYear.findIndex((x: any) => x == e.year) == -1) {
          this.listYear.push(e.year)
        }
      });
      console.log(res)
      this.listChart = res.filter((x: any) => x.year == this.yearNow)

      this.listChart.forEach((i: any) => {
        if (i.month == "01") {
          this.listPriceByMonth[0].price += i.priceOder;
        }
        if (i.month == "02") {
          this.listPriceByMonth[1].price += i.priceOder;
        }
        if (i.month == "03") {
          this.listPriceByMonth[2].price += i.priceOder;
        }
        if (i.month == "04") {
          this.listPriceByMonth[3].price += i.priceOder;
        }
        if (i.month == "05") {
          this.listPriceByMonth[4].price += i.priceOder;
        }
        if (i.month == "06") {
          this.listPriceByMonth[5].price += i.priceOder;
        }
        if (i.month == "07") {
          this.listPriceByMonth[6].price += i.priceOder;
        }
        if (i.month == "08") {
          this.listPriceByMonth[7].price += i.priceOder;
        }
        if (i.month == "09") {
          this.listPriceByMonth[8].price += i.priceOder;
        }
        if (i.month == "10") {
          this.listPriceByMonth[9].price += i.priceOder;
        }
        if (i.month == "11") {
          this.listPriceByMonth[10].price += i.priceOder;
        }
        if (i.month == "12") {
          this.listPriceByMonth[11].price += i.priceOder;
        }
      })
      var myChart = new Chart("myChart", {
        type: "bar",
        data: {
          labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
          datasets: [{
            data: 
            [this.listPriceByMonth[0].price, 
            this.listPriceByMonth[1].price,
             this.listPriceByMonth[2].price, 
             this.listPriceByMonth[3].price, 
             this.listPriceByMonth[4].price,
             this.listPriceByMonth[5].price, 
             this.listPriceByMonth[6].price,
             this.listPriceByMonth[7].price, 
             this.listPriceByMonth[8].price0,
             this.listPriceByMonth[9].price,
             this.listPriceByMonth[10].price,
             this.listPriceByMonth[11].price],
            backgroundColor: "#0f8fff"
          }]
        }
      })
    })
  }
  changyear(event:any){
    this.yearNow = event.target.value
    this.getData();
  }
}
