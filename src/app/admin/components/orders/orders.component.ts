import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../service/admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  orders:any;

  constructor(private adminService:AdminServiceService,
    private snackBar:MatSnackBar
  ){

  }
  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this.adminService.getPlacedOrders().subscribe(res=>{
      this.orders=res;
    })
  }

  changeOrderStatus(orderId:number,status:string){
    this.adminService.changeOrderStatus(orderId,status).subscribe(res =>{
      if(res.id!=null){
        this.snackBar.open("OrderStatus Changed SuccessFully","Close",{duration:5000});
        this.getPlacedOrders();
      }
      else{
        this.snackBar.open("Something Went Wrong","Close",{duration:5000})
      }
    })
  }

}
