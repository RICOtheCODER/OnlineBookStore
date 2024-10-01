import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  hidePassword=true;
  isFormFilled: boolean = false;


  constructor(
    private formbuilder : FormBuilder,
    private authService : AuthService,
    private snackbar : MatSnackBar,
    private router : Router
  ){
     
  }
  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email : [null,[Validators.email,Validators.required]],
      password : [null,[Validators.required]]
    })
    this.loginForm.valueChanges.subscribe(() => {
      this.isFormFilled = this.loginForm.valid;
    });
  }

  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }

  onSubmit(){
    const username=this.loginForm.get('email')!.value;
    const password= this.loginForm.get('password')!.value;

    this.authService.login(username,password).subscribe(
      (res)=>{
          if(UserStorageService.isAdminLoggedIn()){
            console.log("works");
            
            this.router.navigateByUrl('admin/dashboard');
          }
          else if(UserStorageService.isCustomerLoggedIn()){
            this.router.navigateByUrl('customer/dashboard');
          }
      },
      (error)=>{
        this.snackbar.open('Bad Credentials','ERROR',{duration:5000});
         
      }
    )
  }

}
