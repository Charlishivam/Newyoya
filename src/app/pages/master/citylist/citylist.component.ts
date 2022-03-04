import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.scss']
})
export class CitylistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   cityList !: any;
   data:any;
   cityId:any;
   

 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'City', active: true }];
   this.currentpage = 1;
   this.loadData();
  }

  loadData(){
    this.cityList = this.masterService.getCity().subscribe(data => {
      this.cityList = data;
    });
  }
  deleteFormAction(cityId) {
   
  }

}
