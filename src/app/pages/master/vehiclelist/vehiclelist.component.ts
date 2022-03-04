import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrls: ['./vehiclelist.component.scss']
})
export class VehiclelistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  vehicleList !: any;
  data: any;
  vehicle_id: any;

  constructor(private masterService: MasterService) { }

  currentpage: number;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'Vehicle', active: true }];
    this.currentpage = 1;
    this.loadData();

  }

  loadData() {
    this.vehicleList = this.masterService.getVehicle().subscribe(data => {
      this.vehicleList = data;

    });
  }
  deleteFormAction(vehicle_id) {
    this.masterService.deleteVehicleById({ vehicle_id: vehicle_id })
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
        this.masterService.deleteVehicleById(vehicle_id).subscribe(res => {
          this.vehicleList = res;
          if(this.vehicleList.status == true){
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
