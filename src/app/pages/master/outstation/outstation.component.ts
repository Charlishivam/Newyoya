import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';


@Component({
  selector: 'app-outstation',
  templateUrl: './outstation.component.html',
  styleUrls: ['./outstation.component.scss']
})
export class OutstationComponent implements OnInit {

  public outstationId: any
  public outstationForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  vehicleList:any=[];
  outstationList:any;
  dataloader: boolean;
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.outstationForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.outstationForm = this.fb.group({
      processId: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      oneWayPerKmPrice: ['', Validators.required],
      returnWayPerKmPrice: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.outstationId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

  
    this.processList = this.masterService.getProcess().subscribe(data => {
      this.processList = data;
    
    });

    this.vehicleList = this.masterService.getVehicle().subscribe(data => {
      this.vehicleList = data;
    
    });
    
    if (this.outstationId) {
      this.formAction = "Update"
      this.masterService.getOutstatiopriceById(this.outstationId).toPromise().then(data => {
        this.outstationList = data;
        Object.assign(this.outstationList, data);
        this.outstationForm = this.fb.group({
          'countryId': new FormControl(this.outstationList.data.countryId),
          'stateId': new FormControl(this.outstationList.data.stateId),
          'cityId': new FormControl(this.outstationList.data.cityId),
          'processId': new FormControl(this.outstationList.data.processId),
          'vehicleId': new FormControl(this.outstationList.data.vehicleId),
          'oneWayPerKmPrice': new FormControl(this.outstationList.data.oneWayPerKmPrice),
          'returnWayPerKmPrice': new FormControl(this.outstationList.data.returnWayPerKmPrice),
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

  getState(event){
    console.log(event.target.value);
    var obj = {
        countryId:event.target.value
    }
    this.masterService.getStateByCountryId(obj.countryId).subscribe(data =>{
      this.stateList = data;
    })
  }


  getCity(event){
    var obj = {
        stateId:event.target.value
    }
    this.masterService.getCityByStateId(obj.stateId).subscribe(data =>{
      this.cityList = data;
    })
  }
  
  handleSubmit() {
    // if(this.stateForm.invalid){
    //   return
    // }
    //
    this.submit = false;
    if (this.formAction == "Add") {
      const payload = { processId: this.outstationForm.value.processId, stateId: this.outstationForm.value.stateId, cityId: this.outstationForm.value.cityId ,vehicleId: this.outstationForm.value.vehicleId,oneWayPerKmPrice: this.outstationForm.value.oneWayPerKmPrice, countryId: this.outstationForm.value.countryId,returnWayPerKmPrice: this.outstationForm.value.returnWayPerKmPrice}
      this.masterService.createOutstatioprice(payload)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', 'Data not created successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/outstationpricelist'])

        })
        .catch(err => console.log(err))
    }
    if (this.formAction == "Update") {
      this.masterService.updateOutstatioprice(this.outstationId, this.outstationForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/outstationpricelist'])

      })
    }
  }
  

}
