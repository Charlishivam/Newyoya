import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  public cityId: any
  public cityForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];


  dataloader: boolean = false;
  sinDetails: any;
  cityList: any;

  /**
   * Returns form
   */
  get form() {
    return this.cityForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.cityForm = this.fb.group({
      cityName: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.cityId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });

    if (this.cityId) {
      this.formAction = "Update"
      this.masterService.getCityById(this.cityId).toPromise().then(data => {
        this.cityList = data;
        Object.assign(this.cityList, data);
        this.cityForm = this.fb.group({
          'countryId': new FormControl(this.cityList.data.countryId),
          'stateId': new FormControl(this.cityList.data.stateId),
          'cityName': new FormControl(this.cityList.data.cityName),
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


  handleSubmit() {
    // if(this.stateForm.invalid){
    //   return
    // }
    //
    this.submit = false;
    if (this.formAction == "Add") {
      this.masterService.createCity( this.cityForm.value)
        .then((response: any) => {

          if (!response.status) {
            Swal.fire('Data Add !', 'Data not create successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data create successfully! ', 'success');
          this.router.navigate(['master/citylist'])

        })
        .catch(err => console.log(err))
    }

    
    if (this.formAction == "Update") {
      this.masterService.updateCity(this.cityId, this.cityForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/citylist'])

      })
    }
  }
 

  

}
