import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  rentalList:any;
  dataloader: boolean;
  sinDetails: any;

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
      packagePrice: ['', Validators.required],
      additionalMinPrice: ['', Validators.required],
      additionalKmPrice: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      processId: ['', Validators.required]
     
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
     // this.editFormAction(this.rentalpriceId)
     this.masterService.deleteRentalpriceById(this.rentalpriceId).toPromise().then(data => {
      this.rentalList = data;
      Object.assign(this.rentalList, data);
      this.rentalpriceForm = this.fb.group({
        'countryId': new FormControl(this.rentalList.data.countryId),
        'stateId': new FormControl(this.rentalList.data.stateId),
        'cityId': new FormControl(this.rentalList.data.cityId),
        'processId': new FormControl(this.rentalList.data.processId),
        'packagePrice': new FormControl(this.rentalList.data.packagePrice),
        'additionalMinPrice': new FormControl(this.rentalList.data.additionalMinPrice),
        'additionalKmPrice': new FormControl(this.rentalList.data.additionalKmPrice),
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
      const payload = { packagePrice: this.rentalpriceForm.value.packagePrice, countryId: this.rentalpriceForm.value.countryId, stateId: this.rentalpriceForm.value.stateId ,cityId: this.rentalpriceForm.value.cityId,processId: this.rentalpriceForm.value.processId, additionalMinPrice: this.rentalpriceForm.value.additionalMinPrice,additionalKmPrice: this.rentalpriceForm.value.additionalKmPrice}
      this.masterService.createRentalprice(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            Swal.fire('Data Add !', 'Data not created successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/rentallist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.updateRentalprice(this.rentalpriceId, this.rentalpriceForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/rentallist'])

      })
    }
  }
  

}
