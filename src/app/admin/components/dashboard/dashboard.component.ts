import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../service/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit{

  books :any[]=[];
  categoryName:string='';
  searchBookForm! : FormGroup;

  constructor(private adminService : AdminServiceService,
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
  this.adminService.getAllBooks().subscribe((res) => {
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

getNameFromId(id:number){
  this.adminService.getNameFromId(id).subscribe(
    (categoryName)=>{
         this.categoryName=categoryName;
    }
  );
}

submitForm(){
  this.books = [];
  const title= this.searchBookForm.get('title').value;
  this.adminService.getAllBooksByName(title).subscribe((res) => {
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

async deleteBook(bookId:any){
  this.adminService.deleteBooks(bookId).subscribe((res) =>{
   // console.log(res.body);
    
    if(res === null){
      this.snackBar.open('Book Deleted  Successfully !','Close',{
        duration:5000
      })
      this.getAllBooks();
  
    }
    else{
        this.snackBar.open(res.message,'Close',{
          duration:5000,
          panelClass:'error-snackbar'
        });
      }
  })
}

}
