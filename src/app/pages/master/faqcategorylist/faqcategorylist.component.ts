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
 
}

}
