import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyBulkWriteOperation } from 'mongodb';
import Swal from 'sweetalert2';
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
  sinDetails: any;
  rentalpackageList:any;
  dataloader: boolean;

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
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      processId: ['', Validators.required]
     
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
      this.masterService.getRentalpackageById(this.rentalpackageId).toPromise().then(data => {
        this.rentalpackageList = data;
        Object.assign(this.rentalpackageList, data);
        this.rentalpackageForm = this.fb.group({
          'countryId': new FormControl(this.rentalpackageList.data.countryId),
          'stateId': new FormControl(this.rentalpackageList.data.stateId),
          'cityId': new FormControl(this.rentalpackageList.data.cityId),
          'processId': new FormControl(this.rentalpackageList.data.processId),
          'hr': new FormControl(this.rentalpackageList.data.hr),
          'km': new FormControl(this.rentalpackageList.data.km),
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
      const payload = { hr: this.rentalpackageForm.value.hr, countryId: this.rentalpackageForm.value.countryId, stateId: this.rentalpackageForm.value.stateId ,cityId: this.rentalpackageForm.value.cityId,processId: this.rentalpackageForm.value.processId, km: this.rentalpackageForm.value.km}
      this.masterService.createRentalpackage(payload)
        .then((response: any) => {
          if (!response.status) {
            
            Swal.fire('Data Add !', 'Data not created successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/rentalpackagellist'])

        })
        .catch(err => console.log(err))
    }

  
    if (this.formAction == "Update") {
      this.masterService.updateRentalpackage(this.rentalpackageId, this.rentalpackageForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/rentalpackagellist'])

      })
    }
  }
  

}
