import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-couponview',
  templateUrl: './couponview.component.html',
  styleUrls: ['./couponview.component.scss']
})
export class CouponviewComponent implements OnInit {

  couponId: any;
  couponList: any;
  dataloader: boolean;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  success: any;
  data:any;
    

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'View', active: true }];
    this.couponId = this.activatedRouter.snapshot.params['id'];

  
    if (this.couponId) {
      this.masterService.getCouponById(this.couponId).toPromise().then(data => {
        this.couponList = data;
        Object.assign(this.couponList, data);
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}
