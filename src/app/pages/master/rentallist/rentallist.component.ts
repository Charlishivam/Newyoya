import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rentallist',
  templateUrl: './rentallist.component.html',
  styleUrls: ['./rentallist.component.scss']
})
export class RentallistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   rentalpriceList !: any;
   data:any;
   rentalprice_id:any;
 
 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'rentalprice', active: true }];
   this.currentpage = 1;
   this.loadData();
  }
  
  loadData(){
    this.rentalpriceList = this.masterService.getRentalprice().subscribe(data => {
      this.rentalpriceList = data;
      
    });
  }
  deleteFormAction(rentalprice_id) {
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
        this.masterService.deleteRentalpriceById(rentalprice_id).subscribe(res => {
          this.rentalpriceList = res;
          if(this.rentalpriceList.status == true){
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
