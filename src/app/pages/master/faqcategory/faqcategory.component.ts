import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-faqcategory',
  templateUrl: './faqcategory.component.html',
  styleUrls: ['./faqcategory.component.scss']
})
export class FaqcategoryComponent implements OnInit {

  public faqcategoryId: any
  public faqcategoryForm: FormGroup;
  public formAction: any = "Add"; // "Update"
  // Form submition
  submit: boolean;
  



  faqcategoryList:any=[];
  sinDetails: any;

  /**
   * Returns form
   */
  get form() {
    return this.faqcategoryForm.controls;
  }
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.faqcategoryForm = this.fb.group({
      faq_for: ['', Validators.required],
      category_name: ['', Validators.required]
     

     
    })
    this.submit = false;
    this.formAction = "Add"
  }
  ngOnInit(): void {
    this.faqcategoryId = this.activatedRouter.snapshot.params['id'];

    if (this.faqcategoryId) {
      this.formAction = "Update"
     
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
      const payload = { faq_for: this.faqcategoryForm.value.faq_for,  category_name: this.faqcategoryForm.value.category_name}
      this.masterService.createFaqcategory(payload)
        .then((response: any) => {
          if (!response.status) {
            alert(response.message)
            return;
          }
          alert(response.message)
          this.router.navigate(['master/faqcategorylist'])

        })
        .catch(err => console.log(err))
    }

  if (this.formAction == "Update") {
    this.masterService.updateCoupon(this.faqcategoryId, this.faqcategoryForm.value).subscribe(res => {
      this.sinDetails = res;
      if(this.sinDetails.status == true){
        Swal.fire('Data Update !', 'Data updated successfully! ', 'success');
      }else{
        Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
      }
      this.router.navigate(['master/couponlist'])

    })
  }
}
 

}
