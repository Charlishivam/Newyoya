import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customerId: any
  public customerForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  


  countryList:any=[];
  customerList:any=[];

  /**
   * Returns form
   */
  get form() {
    return this.customerForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      mobile_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      country_id: ['', Validators.required]
     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.customerId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });





    
    if (this.customerId) {
      this.formAction = "Update"
      this.editFormAction(this.customerId)
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
      const payload = { mobile_number: this.customerForm.value.mobile_number, country_id: this.customerForm.value.country_id, first_name: this.customerForm.value.first_name,last_name: this.customerForm.value.last_name,email: this.customerForm.value.email}
      this.masterService.createCustomer(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/customerlist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { customer_id: this.customerId,mobile_number: this.customerForm.value.mobile_number, country_id: this.customerForm.value.country_id, first_name: this.customerForm.value.first_name,last_name: this.customerForm.value.last_name,email: this.customerForm.value.email}
      this.masterService.updateCustomer(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/customerlist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(customerId) {
    this.masterService.getCustomerById({ customer_id: customerId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.customerForm.patchValue({ mobile_number: response.data.mobile_number,country_id:response.data.country_id,first_name: response.data.first_name,last_name: response.data.last_name,email: response.data.email})
      })
  }

}
