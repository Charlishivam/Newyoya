import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.scss']
})
export class PushnotificationComponent implements OnInit {

  public pushnotificationId: any
  public pushnotificationForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  

  dataloader: boolean = false;
  sinDetails: any;
  pushnotificationList: any;
  vehicleList: any;

  /**
   * Returns form
   */
  get form() {
    return this.pushnotificationForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.pushnotificationForm = this.fb.group({
      sendTo: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      processId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      subject: ['', Validators.required],
      text: ['', Validators.required],
      image: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.pushnotificationId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    this.processList = this.masterService.getProcess().subscribe(data => {
      this.processList = data;
    
    });

    this.vehicleList = this.masterService.getVehicle().subscribe(data => {
      this.vehicleList = data;
    
    });
    
    if (this.pushnotificationId) {
      this.formAction = "Update"
      this.masterService.getpushNotificationById(this.pushnotificationId).toPromise().then(data => {
        this.pushnotificationList = data;
        Object.assign(this.pushnotificationList, data);
        this.pushnotificationForm = this.fb.group({
          'sendTo': new FormControl(this.pushnotificationList.data.sendTo),
          'countryId': new FormControl(this.pushnotificationList.data.countryId),
          'stateId': new FormControl(this.pushnotificationList.data.stateId),
          'cityId': new FormControl(this.pushnotificationList.data.cityId),
          'subject': new FormControl(this.pushnotificationList.data.subject),
          'text': new FormControl(this.pushnotificationList.data.text),
          'processId': new FormControl(this.pushnotificationList.data.processId),
          'vehicleId': new FormControl(this.pushnotificationList.data.vehicleId),
          'image': new FormControl(this.pushnotificationList.data.image),
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
    this.submit = false;
    if (this.formAction == "Add") {
      this.masterService.createpushNotification(this.pushnotificationForm.value)
        .then((response: any) => {
          console.log(response.error)
          if (!response.status) {
            Swal.fire('Data Add !', response.message, 'success');
            return;
          }
          Swal.fire('Data Add !', response.message, 'success');
          this.router.navigate(['master/pushnotificationlist'])

        })
        .catch(err => console.log(err))
    }

  
    if (this.formAction == "Update") {
      this.masterService.updatepushNotification(this.pushnotificationId, this.pushnotificationForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/pushnotificationlist'])

      })
    }
  }

}
