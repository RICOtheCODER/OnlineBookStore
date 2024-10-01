import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';

@Component({
  selector: 'app-post-book',
  templateUrl: './post-book.component.html',
  styleUrl: './post-book.component.scss',
})
export class PostBookComponent implements OnInit {
  bookForm! : FormGroup
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminServiceService
  ) {}
  ngOnInit(): void {
    this.bookForm = this.fb.group({
      categoryId : [null,[Validators.required]],
      name :[null,[Validators.required]],
      price:[null,[Validators.required]],
      description :[null,[Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories()
  {
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }

  addBook():void{
     if(this.bookForm.valid){
        const formData : FormData = new FormData();
        formData.append('img',this.selectedFile);
        formData.append('categoryId',this.bookForm.get('categoryId').value);
        formData.append('name',this.bookForm.get('name').value);
        formData.append('description',this.bookForm.get('description').value);
        formData.append('price',this.bookForm.get('price').value);

        this.adminService.addBooks(formData).subscribe((res) =>{
          console.log(res.id);
          
          if(res.id != null) {
            this.snackBar.open('Product Posted Successfully !','Close',{
              duration:5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          }else{
            this.snackBar.open(res.message,'ERROR',{
              duration : 5000
            });
          }
        })
     }
     else{
      for(const i in this.bookForm.controls){
        this.bookForm.controls[i].markAsDirty();
        this.bookForm.controls[i].updateValueAndValidity();
      }

     }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader=new FileReader();
    reader.onload = () => {
      this.imagePreview =reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
