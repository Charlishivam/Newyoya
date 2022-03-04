import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {

  public taxId: any
  public taxForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  

  stateList:any=[];
  countryList:any=[];
  //cityList:any=[];
  processList:any=[];
  vehicleList:any=[];

  dataloader: boolean = false;
  sinDetails: any;
  taxList: any;

  /**
   * Returns form
   */
  get form() {
    return this.taxForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.taxForm = this.fb.group({
      taxName: ['', Validators.required],
      taxPrice: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required]
  
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.taxId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });


    this.stateList = this.masterService.getState().subscribe(data => {
      this.stateList = data;
    });

  
    if (this.taxId) {
      this.formAction = "Update"
      this.masterService.getTaxById(this.taxId).toPromise().then(data => {
        this.taxList = data;
        Object.assign(this.taxList, data);
        this.taxForm = this.fb.group({
          'countryId': new FormControl(this.taxList.data.countryId),
          'stateId': new FormControl(this.taxList.data.stateId),
          'taxName': new FormControl(this.taxList.data.taxName),
          'taxPrice': new FormControl(this.taxList.data.taxPrice),
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
      const payload = { taxName: this.taxForm.value.taxName, countryId: this.taxForm.value.countryId, stateId: this.taxForm.value.stateId , taxPrice: this.taxForm.value.taxPrice}
      this.masterService.createTax(payload)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', 'Data not created successfully! ', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully! ', 'success');
          this.router.navigate(['master/taxlist'])

        })
        .catch(err => console.log(err))
    }
    if (this.formAction == "Update") {
      this.masterService.updateTax(this.taxId, this.taxForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/taxlist'])

      })
    }
  }
 
}
