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
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.value) {
      this.masterService.deleteCouponById(couponId).subscribe(res => {
        this.couponList = res;
        if(this.couponList.status == true){
          Swal.fire('Deleted!', 'Data has been deleted !', 'success');
        }else{
          Swal.fire('Deleted !', 'Data has not been deleted !', 'success');
        }
        this.loadData();
      })
    }
  });
 }

}
