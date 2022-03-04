import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.scss']
})
export class RentalComponent implements OnInit {

  public rentalpriceId: any
  public rentalpriceForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  vehicleList:any=[];

  /**
   * Returns form
   */
  get form() {
    return this.rentalpriceForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.rentalpriceForm = this.fb.group({
      package_price: ['', Validators.required],
      additional_min_price: ['', Validators.required],
      additional_km_price: ['', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      process_id: ['', Validators.required]
     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.rentalpriceId = this.activatedRouter.snapshot.params['id'];
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

   
    
    if (this.rentalpriceId) {
      this.formAction = "Update"
      this.editFormAction(this.rentalpriceId)
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
      const payload = { package_price: this.rentalpriceForm.value.package_price, country_id: this.rentalpriceForm.value.country_id, state_id: this.rentalpriceForm.value.state_id ,city_id: this.rentalpriceForm.value.city_id,process_id: this.rentalpriceForm.value.process_id, additional_min_price: this.rentalpriceForm.value.additional_min_price,additional_km_price: this.rentalpriceForm.value.additional_km_price}
      this.masterService.createRentalprice(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/rentallist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { rentalprice_id: this.rentalpriceId,package_price: this.rentalpriceForm.value.package_price, country_id: this.rentalpriceForm.value.country_id, state_id: this.rentalpriceForm.value.state_id ,city_id: this.rentalpriceForm.value.city_id,process_id: this.rentalpriceForm.value.process_id, additional_min_price: this.rentalpriceForm.value.additional_min_price,additional_km_price: this.rentalpriceForm.value.additional_km_price}
      this.masterService.updateRentalprice(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/rentallist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(rentalpriceId) {
    this.masterService.getRentalpriceById({ rentalprice_id: rentalpriceId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.rentalpriceForm.patchValue({ package_price: response.data.package_price,country_id:response.data.country_id,state_id:response.data.state_id, city_id: response.data.city_id,process_id: response.data.process_id,additional_min_price: response.data.additional_min_price,additional_km_price: response.data.additional_km_price})
      })
  }

}
