import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  public stateId: any
  public stateForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  countryList !: any;

  
  stateList !: any;
  dataloader: boolean = false;
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.stateForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.stateForm = this.fb.group({
      stateName: ['', Validators.required],
      countryId: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.stateId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });
    if (this.stateId) {
      this.formAction = "Update"
      this.masterService.getStateById(this.stateId).toPromise().then(data => {
        this.stateList = data;
        Object.assign(this.stateList, data);
        this.stateForm = this.fb.group({
          'countryId': new FormControl(this.stateList.data.countryId),
          'stateName': new FormControl(this.stateList.data.stateName),
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
      const payload = { stateName: this.stateForm.value.stateName, countryId: this.stateForm.value.countryId }
      this.masterService.createState(payload)
        .then((response: any) => {

          if (!response.status) {
            Swal.fire('Data Add !', 'Data created successfully!', 'success');
            return;
          }
          Swal.fire('Data Add !', 'Data created successfully!', 'success');
          this.router.navigate(['master/statelist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.upateState(this.stateId, this.stateForm.value).subscribe(res => {
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
