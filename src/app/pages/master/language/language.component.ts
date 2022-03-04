import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public languageId: any
  public languageForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  countryList !: any;

  languageList: any;
  dataloader: boolean = false;
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.languageForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.languageForm = this.fb.group({
      languageName: ['', Validators.required],
      languageCode: ['', Validators.required],
      countryId: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.languageId = this.activatedRouter.snapshot.params['id'];
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });
    if (this.languageId) {
      this.formAction = "Update"
      this.masterService.getLanguageById(this.languageId).toPromise().then(data => {
        this.languageList = data;
        Object.assign(this.languageList, data);
        this.languageForm = this.fb.group({
          'countryId': new FormControl(this.languageList.data.countryId),
          'languageName': new FormControl(this.languageList.data.languageName),
          'languageCode': new FormControl(this.languageList.data.languageCode),
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
      const payload = { languageName: this.languageForm.value.languageName, languageCode: this.languageForm.value.languageCode, countryId: this.languageForm.value.countryId }
      this.masterService.createLanguage(payload)
        .then((response: any) => {

          if (!response.status) {
            Swal.fire('Data Add !', response.message, 'success');
            return;
          }
          Swal.fire('Data Add !', response.message, 'success');
          this.router.navigate(['master/languagelist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      this.masterService.upateLanguage(this.languageId, this.languageForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/languagelist'])

      })
  }
}
 



}
