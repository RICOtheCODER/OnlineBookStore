import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  bookId=this.activatedRoute.snapshot.params['productId']
  bookForm! : FormGroup
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  existingImage:string | null = null;
  imgChanged=false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminServiceService,
    private activatedRoute:ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this.bookForm = this.fb.group({
      categoryId : [null,[Validators.required]],
      name :[null,[Validators.required]],
      price:[null,[Validators.required]],
      description :[null,[Validators.required]],
    });
    this.getAllCategories();
    this.getBookById();
  }

  getAllCategories()
  {
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories=res;
    })
  }

  getBookById(){
    this.adminService.getBookById(this.bookId).subscribe(res=>{
      this.bookForm.patchValue(res);
      this.existingImage='data:image/jpeg;base64,'+res.byteImg;
    })
  }
  updateBook():void{
     if(this.bookForm.valid){
        const formData : FormData = new FormData();

        if(this.imgChanged && this.selectedFile){
          formData.append('img',this.selectedFile);
        }
        //formData.append('img',this.selectedFile);
        formData.append('categoryId',this.bookForm.get('categoryId').value);
        formData.append('name',this.bookForm.get('name').value);
        formData.append('description',this.bookForm.get('description').value);
        formData.append('price',this.bookForm.get('price').value);

        this.adminService.updateBooks(this.bookId,formData).subscribe((res) =>{
          console.log(res.id);
          
          if(res.id != null) {
            this.snackBar.open('Product Updated Successfully !','Close',{
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
    this.imgChanged=true;
    this.existingImage=null;
  }

  previewImage() {
    const reader=new FileReader();
    reader.onload = () => {
      this.imagePreview =reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
