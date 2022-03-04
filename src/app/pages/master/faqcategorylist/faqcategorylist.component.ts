import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-faqcategorylist',
  templateUrl: './faqcategorylist.component.html',
  styleUrls: ['./faqcategorylist.component.scss']
})
export class FaqcategorylistComponent implements OnInit {

 // bread crumb items
 breadCrumbItems: Array<{}>;
 formData: FormGroup;
 submitted = false;
 error: any;
 faqcategoryList !: any;
 data:any;
 faq_category_id:any;

constructor(private masterService:MasterService) { }

currentpage : number;
ngOnInit(): void {
 this.breadCrumbItems = [{ label: 'Master' }, { label: 'Faq Category', active: true }];
 this.currentpage = 1;
 this.loadData();

}

loadData(){
  this.faqcategoryList = this.masterService.getFaqcategory().subscribe(data => {
    this.faqcategoryList = data;
  });
}


deleteFormAction(faq_category_id) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.value) {
      this.masterService.deleteFaqcategoryById(faq_category_id).subscribe(res => {
        this.faqcategoryList = res;
        if(this.faqcategoryList.status == true){
          Swal.fire('Deleted!', 'Data has been deleted !', 'success');
        }else{
          Swal.fire('Deleted !', 'Data has not been deleted !', 'success');
        }
        this.loadData();
      })
    }
  });
  }
}


