import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { B } from '@angular/cdk/keycodes';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
   
  cartItems:any[]=[];
  order:any;
  couponForm!:FormGroup

  constructor(private customerService:CustomerService,
    private snackbar:MatSnackBar,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.couponForm=this.fb.group({
      code :[null,[Validators.required]]
    })
     this.getCart();
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res =>{
          this.snackbar.open("coupon Applied Successfully",'Close',{duration:5000});
          this.getCart();
    },error =>{
       this.snackbar.open(error.error,'Close',{
        duration:5000
       });
    })
  }

  increaseQuantity(bookId:any){
    this.customerService.increaseBookQuantity(bookId).subscribe(res =>{
      this.snackbar.open('Book Quantity Increased','Close',{duration:5000});
      this.getCart();
    })
  }
  decreaseQuantity(bookId:any){
    this.customerService.decreaseBookQuantity(bookId).subscribe(res =>{
      this.snackbar.open('Book Quantity decreased','Close',{duration:5000});
      this.getCart();
    })
  }
  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }
  // placeOrder() {
  //   this.customerService.placeOrder(this.order).subscribe(
  //     res => {
  //       // Order placed successfully, update cart
  //       this.customerService.getCartbyUserId().subscribe(updatedCart => {
  //         this.cartItems = updatedCart.cartItems; // Update client-side data
  //       });
  //        // Open dialog
  //        this.dialog.open(PlaceOrderComponent);
  //     },
  //     error => {
  //       // Handle error
  //     }
  //   );
  // }


  getCart(){
    this.cartItems=[];
    this.customerService.getCartbyUserId().subscribe(res =>{
      this.order=res;
      res.cartItems.forEach(element => {
        element.processedImg='data:image/jpeg;base64,'+element.returnedImg;
        this.cartItems.push(element);
      })
    })
  }
}
