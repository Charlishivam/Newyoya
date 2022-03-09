import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  public processId: any
  public processForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  cityList:any=[];

  processList: any;
  dataloader: boolean = false;
  sinDetails:any;

  /**
   * Returns form
   */
  get form() {
    return this.processForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.processForm = this.fb.group({
      name: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      cityId: ['', Validators.required],
      icon: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.processId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    this.stateList = this.masterService.getState().subscribe(data => {
      this.stateList = data;
    });

    this.cityList = this.masterService.getCity().subscribe(data => {
      this.cityList = data;
    });
    
    if (this.processId) {
      this.formAction = "Update"

      this.masterService.getProcessById(this.processId).toPromise().then(data => {
        this.processList = data;
        Object.assign(this.processList, data);
        this.processForm = this.fb.group({
          'name': new FormControl(this.processList.data.name),
          'countryId': new FormControl(this.processList.data.countryId),
          'stateId': new FormControl(this.processList.data.stateId),
          'cityId': new FormControl(this.processList.data.cityId),
          'icon': new FormControl(this.processList.data.icon),
          'isActive': '1'
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
    // if(this.stateForm.invalid){
    //   return
    // }
    //
    this.submit = false;
    if (this.formAction == "Add") {
      //this.processForm.value
      this.masterService.createProcess(this.processForm.value)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', 'Data not create successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data create successfully! ', 'success');
          this.router.navigate(['master/processlist'])
        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.updateProcess(this.processId, this.processForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/processlist'])

      })
    }
  }

  

}
