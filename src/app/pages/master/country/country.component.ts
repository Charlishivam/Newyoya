import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public countryId: any
  public countryForm: FormGroup;
  public formAction: any = "Add"; // "Update"

  countryList: any;
  editCountryForm: FormGroup = new FormGroup({});
  dataloader: boolean = false;
  // Form submition
  submit: boolean;
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.countryForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.countryForm = this.fb.group({
      countryName: ['', Validators.required],
      countryCode: ['', Validators.required],
      countryDialingCode: ['', Validators.required],
      flag: ['', Validators.required]

    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.countryId = this.activatedRouter.snapshot.params['id'];
    if (this.countryId) {
      this.formAction = "Update"
      this.masterService.findCountry(this.countryId).toPromise().then(data => {
        this.countryList = data;
        Object.assign(this.countryList, data);
        this.countryForm = this.formBuilder.group({
          'countryName': new FormControl(this.countryList.data.countryName),
          'countryCode': new FormControl(this.countryList.data.countryCode),
          'countryDialingCode': new FormControl(this.countryList.data.countryDialingCode),
          'flag': new FormControl(this.countryList.data.flag),
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
      const payload = { countryName: this.countryForm.value.countryName, countryCode: this.countryForm.value.countryCode, countryDialingCode: this.countryForm.value.countryDialingCode,flag:this.countryForm.value.flag }
      this.masterService.createCountry(payload)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', response.message, 'success');
            return;
          }
          Swal.fire('Data Add !', response.message, 'success');
          this.router.navigate(['master/countrylist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.upateCountry(this.countryId, this.countryForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/countrylist'])

      })
    }
  }








}

