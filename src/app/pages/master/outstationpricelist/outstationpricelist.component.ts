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
        this.masterService.deleteOutstationpriceById(otpricing_id).subscribe(res => {
          this.outstationpriceList = res;
          if(this.outstationpriceList.status == true){
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
