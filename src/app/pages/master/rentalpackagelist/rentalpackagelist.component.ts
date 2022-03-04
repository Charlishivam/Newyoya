import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rentalpackagelist',
  templateUrl: './rentalpackagelist.component.html',
  styleUrls: ['./rentalpackagelist.component.scss']
})
export class RentalpackagelistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  rentalpackageList !: any;
  data:any;
  rpackage_id:any;

constructor(private masterService:MasterService) { }

currentpage : number;
ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Master' }, { label: 'rentalpackage', active: true }];
  this.currentpage = 1;

  this.loadData();

  }
  
  loadData(){
    this.rentalpackageList = this.masterService.getRentalpackage().subscribe(data => {
      this.rentalpackageList = data;
      
    });
  }
  deleteFormAction(rpackage_id) {
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
        this.masterService.deleteRentalpackageById(rpackage_id).subscribe(res => {
          this.rentalpackageList = res;
          if(this.rentalpackageList.status == true){
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
