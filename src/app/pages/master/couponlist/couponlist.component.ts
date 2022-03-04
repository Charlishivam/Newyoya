import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-couponlist',
  templateUrl: './couponlist.component.html',
  styleUrls: ['./couponlist.component.scss']
})
export class CouponlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  couponList !: any;
  data:any;
  couponId:any;

constructor(private masterService:MasterService) { }

currentpage : number;
ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Master' }, { label: 'Coupon', active: true }];
  this.currentpage = 1;
  this.loadData();
}

loadData(){
  this.couponList = this.masterService.getCoupon().subscribe(data => {
    this.couponList = data;
  });
}
deleteFormAction(couponId) {
  
}

}
