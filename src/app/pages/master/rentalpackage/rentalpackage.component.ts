import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-rentalpackage',
  templateUrl: './rentalpackage.component.html',
  styleUrls: ['./rentalpackage.component.scss']
})
export class RentalpackageComponent implements OnInit {

  public rentalpackageId: any
  public rentalpackageForm: FormGroup;
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
    return this.rentalpackageForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.rentalpackageForm = this.fb.group({
      hr: ['', Validators.required],
      km: ['', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city_id: ['', Validators.required],
      process_id: ['', Validators.required]
     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.rentalpackageId = this.activatedRouter.snapshot.params['id'];
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

   
    
    if (this.rentalpackageId) {
      this.formAction = "Update"
      this.editFormAction(this.rentalpackageId)
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
      const payload = { hr: this.rentalpackageForm.value.hr, country_id: this.rentalpackageForm.value.country_id, state_id: this.rentalpackageForm.value.state_id ,city_id: this.rentalpackageForm.value.city_id,process_id: this.rentalpackageForm.value.process_id, km: this.rentalpackageForm.value.km}
      this.masterService.createRentalpackage(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/rentalpackagellist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { rpackage_id: this.rentalpackageId,hr: this.rentalpackageForm.value.hr, country_id: this.rentalpackageForm.value.country_id, state_id: this.rentalpackageForm.value.state_id ,city_id: this.rentalpackageForm.value.city_id,process_id: this.rentalpackageForm.value.process_id, km: this.rentalpackageForm.value.km}
      this.masterService.updateRentalpackage(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/rentalpackagellist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(rentalpackageId) {
    this.masterService.getRentalpackageById({ rpackage_id: rentalpackageId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.rentalpackageForm.patchValue({ hr: response.data.hr,country_id:response.data.country_id,state_id:response.data.state_id, city_id: response.data.city_id,process_id: response.data.process_id,km: response.data.km})
      })
  }

}
