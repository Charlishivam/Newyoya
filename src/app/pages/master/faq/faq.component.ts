import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public faqId: any
  public faqForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  



  faqList:any=[];

  /**
   * Returns form
   */
  get form() {
    return this.faqForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.faqForm = this.fb.group({
      faq_for: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]

     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.faqId = this.activatedRouter.snapshot.params['id'];

    if (this.faqId) {
      this.formAction = "Update"
      this.editFormAction(this.faqId)
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
      const payload = { faq_for: this.faqForm.value.faq_for,  question: this.faqForm.value.question,answer: this.faqForm.value.answer}
      this.masterService.createFaq(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/faqlist'])

        })
        .catch(err => console.log(err))
    }

    if (this.formAction == "Update") {
      const payload = { faq_id: this.faqId,faq_for: this.faqForm.value.faq_for, question: this.faqForm.value.question,answer: this.faqForm.value.answer}
      this.masterService.updateFaq(payload)
        .then((response: any) => {

          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/faqlist'])
        })
        .catch(err => console.log(err))
    }
  }
  editFormAction(faqId) {
    this.masterService.getFaqById({ faq_id: faqId })
      .then((response: any) => {
        if (!response.status) {
          // msg
          return
        }
        this.faqForm.patchValue({ faq_for: response.data.faq_for,question: response.data.question,answer: response.data.answer})
      })
  }

}
