import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../service/admin-service.service';
import { R } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {
  coupons:any;

  constructor(private adminService:AdminServiceService){

  }
  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this.adminService.getCoupons().subscribe(res =>{
      this.coupons=res;
    })
  }

}
