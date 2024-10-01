import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-view-orderedbooks',
  templateUrl: './view-orderedbooks.component.html',
  styleUrl: './view-orderedbooks.component.scss'
})
export class ViewOrderedbooksComponent implements OnInit {
  orderId:any=this.activatedroute.snapshot.params['orderId'];
  orderedProductsDetailsList=[];
  totalAmount:any;
  constructor(private activatedroute:ActivatedRoute,
    private customerService:CustomerService,
  ){

  }
  ngOnInit(): void {
    this.getOrderedBooksDetailsByOrderId();
  }


  getOrderedBooksDetailsByOrderId(){
    this.customerService.getOrderedBooks(this.orderId).subscribe(res=>{
      res.booksDtoList.array.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.byteImg;
        this.orderedProductsDetailsList.push(element);
      });
      this.totalAmount=res.orderAmount;
    })
  }

}
