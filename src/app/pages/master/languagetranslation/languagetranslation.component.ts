import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-languagetranslation',
  templateUrl: './languagetranslation.component.html',
  styleUrls: ['./languagetranslation.component.scss']
})
export class LanguagetranslationComponent implements OnInit {

  public languagetranslationId: any
  public languagetranslationForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  countryList !: any;

  /**
   * Returns form
   */
  get form() {
    return this.languagetranslationForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.languagetranslationForm = this.fb.group({
      lang: ['', Validators.required],
      lang_key: ['', Validators.required],
      lang_value: ['', Validators.required]
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.languagetranslationId = this.activatedRouter.snapshot.params['id'];
    if (this.languagetranslationId) {
      this.formAction = "Update"
      this.editFormAction(this.languagetranslationId)
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
      const payload = { lang: this.languagetranslationForm.value.lang, lang_key: this.languagetranslationForm.value.lang_key, lang_value: this.languagetranslationForm.value.lang_value }
      this.masterService.createLanguagetranslation(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/languagetrsnslationlist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { lang_trans_id: this.languagetranslationId, lang: this.languagetranslationForm.value.lang, lang_key: this.languagetranslationForm.value.lang_key, lang_value: this.languagetranslationForm.value.lang_value }
      this.masterService.upateLanguagetranslation(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/languagetrsnslationlist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(languagetranslationId) {
    this.masterService.getLanguagetranslationById({lang_trans_id: languagetranslationId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.languagetranslationForm.patchValue({ lang: response.data.lang, lang_key: response.data.lang_key, lang_value: response.data.lang_value })
      })
  }

}
