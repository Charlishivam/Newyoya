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
        this.masterService.deleteNormalpriceById(pricing_id).subscribe(res => {
          this.normalpriceList = res;
          if(this.normalpriceList.status == true){
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
