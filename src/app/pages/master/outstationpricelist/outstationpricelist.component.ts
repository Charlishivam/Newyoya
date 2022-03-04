import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-outstationpricelist',
  templateUrl: './outstationpricelist.component.html',
  styleUrls: ['./outstationpricelist.component.scss']
})
export class OutstationpricelistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   outstationpriceList !: any;
   data:any;
   otpricing_id:any;
 
 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'outstationprice', active: true }];
   this.currentpage = 1;

   this.loadData();

  }
  
  loadData(){
    this.outstationpriceList = this.masterService.getOutstationprice().subscribe(data => {
      this.outstationpriceList = data;
    });
  }
  deleteFormAction(otpricing_id) {
    
  }

}
