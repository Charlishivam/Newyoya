import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  dataloader: boolean = false;
  sinDetails: any;

  



  faqList:any;

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
      faqFor: ['', Validators.required],
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
      this.masterService.getFaqById(this.faqId).toPromise().then(data => {
        this.faqList = data;
        Object.assign(this.faqList, data);
        this.faqForm = this.fb.group({
          'faqFor': new FormControl(this.faqList.data.faqFor),
          'question': new FormControl(this.faqList.data.question),
          'answer': new FormControl(this.faqList.data.answer),
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

      console.log(this.faqForm.value)
      this.masterService.createFaq(this.faqForm.value)
        .then((response: any) => {
          if (!response.status) {
            Swal.fire('Data Add !', response.message, 'success');
            return;
          }
          Swal.fire('Data Add !', response.message, 'success');
          this.router.navigate(['master/faqlist'])

        })
        .catch(err => console.log(err))
    }
    if (this.formAction == "Update") {
      this.masterService.updateFaq(this.faqId, this.faqForm.value).subscribe(res => {
        this.sinDetails = res;
        if(this.sinDetails.status == true){
          Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
        }else{
          Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
        }
        this.router.navigate(['master/faqlist'])

      })
    }
  }
  

}
