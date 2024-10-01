import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from '../../../admin/service/admin-service.service';
import { CustomerService } from '../../services/customer.service';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  books :any[]=[];
  categoryName:string='';
  searchBookForm! : FormGroup;

  constructor(private customerService : CustomerService,
    private fb:FormBuilder,
    private snackBar:MatSnackBar,
  ){

  }
  ngOnInit(): void {
    console.log("hello");
        
    this.getAllBooks();
    this.searchBookForm=this.fb.group({
      title:[null,[Validators.required]]
    });
  }


  // async getAllBooks(){
  //   this.books=[];
  //   this.adminService.getAllBooks().subscribe((res)=>{
  //     res.array.forEach((element)=> {
  //       element.processedImg = 'data:image/jpeg;base64,'+element.byteImg;
  //       this.books.push(element);
  //     });
  //   })
  // }
  // getAllBooks() {
  //   this.books = [];
  //   this.adminService.getAllBooks().subscribe((res) => {
  //     console.log(res+"yo");
      
  //     if (res.array) { // Check if data exists
  //       console.log("book1");
        
  //       res.array.forEach((element) => {
  //         element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
  //         this.books.push(element);
  //       });
  //     }
  //   });
  // }
//   getAllBooks() {
//   this.books = [];
//   this.adminService.getAllBooks().subscribe((res) => {
//     console.log('Full response:', res);

//     // Check if the array is nested under a different key
//     if (res && res.data) {
//       console.log("book1");
//       res.data.forEach((element) => {
//         element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
//         this.books.push(element);
//       });
//     }
//   });
// }
getAllBooks() {
  this.books = [];
  this.customerService.getAllBooks().subscribe((res) => {
    console.log('Full response:', res);

    // Directly work with the array if res is already an array
    if (Array.isArray(res)) {
      console.log("book1");
      res.forEach((element) => {
        // Check if element has the properties you expect
        if (element && element.byteImg) {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.books.push(element);
        }
      });
    } else {
      console.warn('Response is not an array:', res);
    }
  });
}


submitForm(){
  this.books = [];
  const title= this.searchBookForm.get('title').value;
  this.customerService.getAllBooksByName(title).subscribe((res) => {
    console.log('Full response:', res);

    // Directly work with the array if res is already an array
    if (Array.isArray(res)) {
      console.log("book1");
      res.forEach((element) => {
        // Check if element has the properties you expect
        if (element && element.byteImg) {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.books.push(element);
        }
      });
    } else {
      console.warn('Response is not an array:', res);
    }
  });
}

addToCart(id:any){
  
    this.customerService.addToCart(id).subscribe(res => {
      this.snackBar.open("Product added to cart successfully","Close",{duration:5000})
    })
  }
}

