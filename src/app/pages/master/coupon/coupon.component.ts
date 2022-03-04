import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  public couponId: any
  public couponForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  vehicleList:any=[];
  customerList:any=[];
  sinDetails: any;
  couponList: any;
  dataloader: boolean;

  /**
   * Returns form
   */
  get form() {
    return this.couponForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.couponForm = this.fb.group({
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      countryDialingCode: ['', Validators.required],
      cityId: ['', Validators.required],
      processId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      userId: ['', Validators.required],
      couponName: ['', Validators.required],
      couponCode: ['', Validators.required],
      isAutoApply: ['', Validators.required],
      discountType: ['', Validators.required],
      couponType: ['', Validators.required],
      maxUserUses: ['', Validators.required],
      minAmount: ['', Validators.required],
      maxAmountOfDiscount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
     

    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.couponId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    this.cityList = this.masterService.getCity().subscribe(data => {
      this.cityList = data;
    });

    this.stateList = this.masterService.getState().subscribe(data => {
      this.stateList = data;
    });

    this.processList = this.masterService.getProcess().subscribe(data => {
      this.processList = data;
    
    });

    this.customerList = this.masterService.getCustomer().subscribe(data => {
      this.customerList = data;
    });

    this.vehicleList = this.masterService.getVehicle().subscribe(data => {
      this.vehicleList = data;
    
    });
    
    if (this.couponId) {
      this.formAction = "Update"

      this.masterService.getCouponById(this.couponId).toPromise().then(data => {
        this.couponList = data;
        Object.assign(this.couponList, data);
        this.couponForm = this.fb.group({
          'countryId': new FormControl(this.couponList.data.countryId),
          'stateId': new FormControl(this.couponList.data.stateId),
          'countryDialingCode': new FormControl(this.couponList.data.countryDialingCode),
          'cityId': new FormControl(this.couponList.data.cityId),
          'processId': new FormControl(this.couponList.data.processId),
          'vehicleId': new FormControl(this.couponList.data.vehicleId),
          'userId': new FormControl(this.couponList.data.userId),
          'couponName': new FormControl(this.couponList.data.couponName),
          'couponCode': new FormControl(this.couponList.data.couponCode),
          'isAutoApply': new FormControl(this.couponList.data.isAutoApply),
          'discountType': new FormControl(this.couponList.data.discountType),
          'couponType': new FormControl(this.couponList.data.couponType),
          'maxUserUses': new FormControl(this.couponList.data.maxUserUses),
          'minAmount': new FormControl(this.couponList.data.minAmount),
          'maxAmountOfDiscount': new FormControl(this.couponList.data.maxAmountOfDiscount),
          'startDate': new FormControl(this.couponList.data.startDate),
          'endDate': new FormControl(this.couponList.data.endDate),
          'isActive': '1',
        })

        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
      
    } else {
      this.formAction = "Add"
    }
  }
  
  handleSubmit() {
    // if(this.stateForm.invalid){
    //   return
    // }
    //
    this.submit = false;
    if (this.formAction == "Add") {
     
      this.masterService.createCoupon(this.couponForm.value)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', 'Data created successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/couponlist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.updateCoupon(this.couponId, this.couponForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/couponlist'])

      })
    }
  }
}
