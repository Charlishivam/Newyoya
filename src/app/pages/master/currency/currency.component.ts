import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  public currencyId: any
  public currencyForm: FormGroup;
  public formAction: any = "Add"; // "Update"

  currencyList: any;
  dataloader: boolean = false;
  sinDetails:any;

  // Form submition
  submit: boolean;

  
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
   
  ) {
    this.currencyForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      symbol: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.currencyId = this.activatedRouter.snapshot.params['id'];
    if (this.currencyId) {
      this.formAction = "Update"
      this.masterService.findCurrency(this.currencyId).toPromise().then(data => {
        this.currencyList = data;
        Object.assign(this.currencyList, data);
        this.currencyForm = this.formBuilder.group({
          'name': new FormControl(this.currencyList.data.name),
          'code': new FormControl(this.currencyList.data.code),
          'symbol': new FormControl(this.currencyList.data.symbol),
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
      const payload = { name: this.currencyForm.value.name, code: this.currencyForm.value.code, symbol: this.currencyForm.value.symbol }
      this.masterService.createCurrency(payload)
        .then((response: any) => {

          if (!response.status) {
            Swal.fire('Data Add !', response.message, 'success');
            return;
          }
         
          Swal.fire('Data Add !', response.message, 'success');
          this.router.navigate(['master/currencylist'])

        })
        .catch(err => console.log(err))
    }
    if (this.formAction == "Update") {
      this.masterService.currencyUpdate(this.currencyId, this.currencyForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/currencylist'])

      })
    }
  }



}
