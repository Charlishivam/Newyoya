import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-normalpricelist',
  templateUrl: './normalpricelist.component.html',
  styleUrls: ['./normalpricelist.component.scss']
})
export class NormalpricelistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   normalpriceList !: any;
   data:any;
   pricing_id:any;
 
 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'normalprice', active: true }];
   this.currentpage = 1;
   
   this.loadData();

  }
  
  loadData(){
    this.normalpriceList = this.masterService.getNormalprice().subscribe(data => {
      this.normalpriceList = data;
     
    });
  }
  deleteFormAction(pricing_id) {
   
  }

}
