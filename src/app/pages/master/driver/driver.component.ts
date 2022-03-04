import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public driverId: any
  public driverForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  


  countryList:any=[];

  /**
   * Returns form
   */
  get form() {
    return this.driverForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.driverForm = this.fb.group({
      phone_number: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      country_id: ['', Validators.required],
      password: ['', Validators.required],
      driver_referred_by: ['', Validators.required],
      driver_description: ['', Validators.required],
      
     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.driverId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    if (this.driverId) {
      this.formAction = "Update"
      this.editFormAction(this.driverId)
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
      const payload = { phone_number: this.driverForm.value.phone_number, country_id: this.driverForm.value.country_id, first_name: this.driverForm.value.first_name,last_name: this.driverForm.value.last_name,email: this.driverForm.value.email,password: this.driverForm.value.password,driver_referred_by: this.driverForm.value.driver_referred_by,driver_description: this.driverForm.value.driver_description}
      this.masterService.createDriver(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/driverlist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { driver_id: this.driverId,phone_number: this.driverForm.value.phone_number, country_id: this.driverForm.value.country_id, first_name: this.driverForm.value.first_name,last_name: this.driverForm.value.last_name,email: this.driverForm.value.email,driver_referred_by: this.driverForm.value.driver_referred_by,driver_description: this.driverForm.value.driver_description}
      this.masterService.updateDriver(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/driverlist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(driverId) {
    this.masterService.getDriverById({ driver_id: driverId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.driverForm.patchValue({ phone_number: response.data.phone_number,country_id:response.data.country_id,first_name: response.data.first_name,last_name: response.data.last_name,password: response.data.password,email: response.data.email,driver_referred_by: response.data.driver_referred_by,driver_description: response.data.driver_description})
      })
  }

}
