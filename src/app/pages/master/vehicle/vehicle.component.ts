import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';
import { Key } from 'protractor';
import { empty } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  public vehicleId: any
  public vehicleForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  iconPath: string;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];
  processList:any=[];
  selFile: File=null;
  dataloader: boolean = false;
  sinDetails: any;
  vehicleList: any;
  error: any;
  image: any;
  fileName: string;

  /**
   * Returns form
   */
  get form() {
    return this.vehicleForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      name: [''],
      countryId: [''],
      stateId: [''],
      cityId: [''],
      processId: [''],
      vehicleDescription: [''],
      icon: [null]
    
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.vehicleId = this.activatedRouter.snapshot.params['id'];
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
    
    if (this.vehicleId) {
      this.formAction = "Update"
      this.masterService.getVehicleById(this.vehicleId).toPromise().then(data => {
        this.vehicleList = data;
        Object.assign(this.vehicleList, data);
        this.vehicleForm = this.fb.group({
          'countryId': new FormControl(this.vehicleList.data.countryId),
          'stateId': new FormControl(this.vehicleList.data.stateId),
          'cityId': new FormControl(this.vehicleList.data.cityId),
          'name': new FormControl(this.vehicleList.data.name),
          'vehicleDescription': new FormControl(this.vehicleList.data.vehicleDescription),
          'processId': new FormControl(this.vehicleList.data.processId),
          'icon': new FormControl(this.vehicleList.data.icon),
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

  // onFileChange(event) {
  //   const reader = new FileReader();
  //   if(event.target.files && event.target.files.length) {
  //     const file = (event.target as HTMLInputElement.files[0];
  //       this.vehicleForm.patchValue({
  //         fileSource:file
  //       })
        
  //       )

  //     this.selFile=<File>event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imageSrc = reader.result as string;
       
  //     };
  //   }
  // }



  onFileChange(event) {
    const reader = new FileReader();
    const file:File = event.target.files[0];
    this.vehicleForm.patchValue({
      icon: file
    });
    reader.readAsDataURL(file);
      reader.onload = () => {
        this.iconPath = reader.result as string;
       
      };
    this.vehicleForm.get('icon').updateValueAndValidity()
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

      const fromData:any = new FormData();
      fromData.append('name',this.vehicleForm.get('name').value);
      fromData.append('countryId',this.vehicleForm.get('countryId').value);
      fromData.append('stateId',this.vehicleForm.get('stateId').value);
      fromData.append('cityId',this.vehicleForm.get('cityId').value);
      fromData.append('vehicleDescription',this.vehicleForm.get('vehicleDescription').value);
      fromData.append('processId',this.vehicleForm.get('processId').value);
      fromData.append('icon',this.vehicleForm.get('icon').value);
    

  
      //const payload = { name: this.vehicleForm.get('name').value, countryId: this.vehicleForm.get('countryId').value,stateId: this.vehicleForm.get('stateId').value ,cityId: this.vehicleForm.get('cityId').value,vehicleDescription: this.vehicleForm.get('vehicleDescription').value,processId: this.vehicleForm.get('processId').value ,icon: this.vehicleForm.get('icon').value.name }
      //console.log(payload)
      this.sinDetails = this.masterService.createVehicle(fromData);
      this.sinDetails.subscribe(res => {
          if(res.status == true){
            Swal.fire('Data!', 'Data created successfully! ', 'success');
          }else{
            Swal.fire('Data!', 'Data not created successfully! ', 'success');
          }
          this.router.navigate(['master/vehiclelist'])
        },(error)=>{
           Swal.fire('Data Not Update !', 'Oops! Something went wrong ! Help us improve your experience by sending an error report   !', 'success');
           this.error = error;
        })
    }

  
    if (this.formAction == "Update") {

 

      const fromData:any = new FormData();
      fromData.append('name',this.vehicleForm.get('name').value);
      fromData.append('countryId',this.vehicleForm.get('countryId').value);
      fromData.append('stateId',this.vehicleForm.get('stateId').value);
      fromData.append('cityId',this.vehicleForm.get('cityId').value);
      fromData.append('vehicleDescription',this.vehicleForm.get('vehicleDescription').value);
      fromData.append('processId',this.vehicleForm.get('processId').value);
      fromData.append('icon',this.vehicleForm.get('icon').value);
      fromData.append('isActive',this.vehicleForm.get('isActive').value);
      this.masterService.updateVehicle(this.vehicleId,fromData).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/vehiclelist'])

      },(error)=>{
        Swal.fire('Data Not Update !', 'Oops! Something went wrong ! Help us improve your experience by sending an error report!', 'success');
        this.error = error;
     })
    }
  }
 

}
