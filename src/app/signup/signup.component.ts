import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
signupForm! :  FormGroup;
hidePassword=true;
isFormFilled: boolean = false;
constructor(private fb:FormBuilder,
  private snackBar : MatSnackBar,
  private authService: AuthService,
  private router : Router
){
   
}
  ngOnInit(): void {
  
    this.signupForm=this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.email,Validators.required]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]]
    })
    this.signupForm.valueChanges.subscribe(() => {
      this.isFormFilled = this.signupForm.valid;
    });
  }


  togglePasswordVisibility(){
    this.hidePassword=!this.hidePassword;
  }


onSubmit(){
  const password=this.signupForm.get('password')?.value;
  const confirmPassword = this.signupForm.get('confirmPassword')?.value;


  if(password!==confirmPassword){
    this.snackBar.open('Passwords do not match','Close',{duration:5000,panelClass:'error-snackbar'});
    return;
  }
  this.authService.register(this.signupForm.value).subscribe(
    (response)=>{
      this.snackBar.open('Sign Up Successful','Close',{duration:5000})
      this.router.navigateByUrl("/login")
    },
    (error)=>{
      this.snackBar.open('Sign Up Failed.Please Try Again','Close',{duration:5000 , panelClass:'error-snackbar'});
    }
  )
}
}
