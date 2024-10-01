import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit{
  orderForm!:FormGroup;
  cartItems:any[]=[];
  order:any;

  constructor(private fb:FormBuilder,
    private snackBar:MatSnackBar,
    private customerService:CustomerService,
    private router:Router,
    public dialog:MatDialog
  ){
    
  }
  ngOnInit(): void {
    this.orderForm=this.fb.group({
      address:[null,[Validators.required]],
      orderDescription:[null],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res =>{
      if(res.id!=null){
         this.snackBar.open("Order Placed Successfully","Close",{duration:5000})
         this.router.navigateByUrl("/customer/my_orders");
         this.closeForm();
         this.afterOrder();
        
      }
      else{
        this.snackBar.open("Something went wrong","Close",{duration:5000})
      }
    })
  }
  afterOrder() {
    this.customerService.placeOrder(this.order).subscribe(
      res => {
        // Order placed successfully, update cart
        this.customerService.getCartbyUserId().subscribe(updatedCart => {
          this.cartItems = updatedCart.cartItems; // Update client-side data
        });
         // Open dialog
      },
      error => {
        // Handle error
      }
    );
  }
  closeForm(){
    this.dialog.closeAll();
  }
}
