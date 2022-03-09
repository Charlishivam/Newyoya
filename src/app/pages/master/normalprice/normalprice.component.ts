import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-normalprice',
  templateUrl: './normalprice.component.html',
  styleUrls: ['./normalprice.component.scss']
})
export class NormalpriceComponent implements OnInit {

  public normalpriceId: any
  public normalpriceForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  vehicleList:any=[];
  normalpriceList:any;
  dataloader: boolean;
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.normalpriceForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.normalpriceForm = this.fb.group({
      processId: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      baseFare: ['', Validators.required],
      normalHoursPricing: ['', Validators.required],
      peakHoursPricing: ['', Validators.required],
      freeWaitingTime: ['', Validators.required],
      waitingCharges: ['', Validators.required],
      stoppageCharges: ['', Validators.required],
      adminCommision: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.normalpriceId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    this.stateList = this.masterService.getState().subscribe(data => {
      this.stateList = data;
    });

    this.cityList = this.masterService.getCity().subscribe(data => {
      this.cityList = data;
    });

   
    this.processList = this.masterService.getProcess().subscribe(data => {
      this.processList = data;
    
    });

    this.vehicleList = this.masterService.getVehicle().subscribe(data => {
      this.vehicleList = data;
    
    });
    
    if (this.normalpriceId) {
      this.formAction = "Update"
     

      this.masterService.getNormalpriceById(this.normalpriceId).toPromise().then(data => {
        this.normalpriceList = data;
        Object.assign(this.normalpriceList, data);
        this.normalpriceForm = this.fb.group({
          'processId': new FormControl(this.normalpriceList.data.processId),
          'countryId': new FormControl(this.normalpriceList.data.countryId),
          'stateId': new FormControl(this.normalpriceList.data.stateId),
          'cityId': new FormControl(this.normalpriceList.data.cityId),
          'vehicleId': new FormControl(this.normalpriceList.data.vehicleId),
          'baseFare': new FormControl(this.normalpriceList.data.baseFare),
          'normalHoursPricing': new FormControl(this.normalpriceList.data.normalHoursPricing),
          'peakHoursPricing': new FormControl(this.normalpriceList.data.peakHoursPricing),
          'freeWaitingTime': new FormControl(this.normalpriceList.data.freeWaitingTime),
          'waitingCharges': new FormControl(this.normalpriceList.data.waitingCharges),
          'stoppageCharges': new FormControl(this.normalpriceList.data.stoppageCharges),
          'adminCommision': new FormControl(this.normalpriceList.data.adminCommision),
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
      const payload = { processId: this.normalpriceForm.value.processId, peakHoursPricing: this.normalpriceForm.value.peakHoursPricing, freeWaitingTime: this.normalpriceForm.value.freeWaitingTime ,waitingCharges: this.normalpriceForm.value.waitingCharges,stoppageCharges: this.normalpriceForm.value.stoppageCharges, countryId: this.normalpriceForm.value.countryId,stateId: this.normalpriceForm.value.stateId,cityId: this.normalpriceForm.value.cityId,vehicleId: this.normalpriceForm.value.vehicleId,baseFare: this.normalpriceForm.value.baseFare,normalHoursPricing: this.normalpriceForm.value.normalHoursPricing,adminCommision: this.normalpriceForm.value.adminCommision}
      this.masterService.createNormalprice(payload)
        .then((response: any) => {
          if (!response.status) {
            
            Swal.fire('Data Add !', 'Data not created successfully! ', 'success');
            return;
          }
         
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/normalpricelist'])

        })
        .catch(err => console.log(err))
    }

    

    if (this.formAction == "Update") {
      this.masterService.updateNormalprice(this.normalpriceId, this.normalpriceForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/statelist'])

      })
    }
  }

}
