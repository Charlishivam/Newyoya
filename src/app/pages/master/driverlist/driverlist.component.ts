import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrls: ['./driverlist.component.scss']
})
export class DriverlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  driverList !: any;
  data:any;
  driver_id:any;

constructor(private masterService:MasterService) { }

currentpage : number;
ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Master' }, { label: 'Driver', active: true }];
  this.currentpage = 1;
  this.loadData();
}

loadData(){
  this.driverList = this.masterService.getDriver().subscribe(data => {
    this.driverList = data;
   
  });
}
deleteFormAction(driver_id) {
  this.masterService.deleteDriverById({ driver_id: driver_id })
  .then((response: any) => {
    if (!response.status) {
      Swal.fire('Deleted!', response.message, 'success');
      return;
    }
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
        Swal.fire('Deleted!', 'Data has been deleted.', 'success');
        this.loadData();
      }
    });
  })
  .catch(err => console.log(err))
}

}
