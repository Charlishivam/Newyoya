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
     
  }

}
