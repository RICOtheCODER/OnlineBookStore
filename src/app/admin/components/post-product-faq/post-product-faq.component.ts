import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminServiceService } from '../../service/admin-service.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrl: './post-product-faq.component.scss',
})
export class PostProductFaqComponent implements OnInit {
  bookId: number = this.activatedRoute.snapshot.params['productId'];
  FaqForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminServiceService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.FaqForm = this.fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    });
  }
  postFaq() {
    console.log(this.bookId);

    this.adminService
      .postFaq(this.bookId, this.FaqForm.value)
      .subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Faq Posted Successfully!', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open('Something Went Wrong', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar',
          });
        }
      });
  }
}
