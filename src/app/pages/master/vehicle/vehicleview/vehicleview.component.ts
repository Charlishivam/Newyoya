import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-vehicleview',
  templateUrl: './vehicleview.component.html',
  styleUrls: ['./vehicleview.component.scss']
})
export class VehicleviewComponent implements OnInit {

  vehicleId: any;
  vehicleList: any;
  dataloader: boolean;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  success: any;
  data:any;
    

  constructor(private fb: FormBuilder,
    private masterService: MasterService,
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'View', active: true }];
    this.vehicleId = this.activatedRouter.snapshot.params['id'];

  
    if (this.vehicleId) {
      this.masterService.getVehicleById(this.vehicleId).toPromise().then(data => {
        this.vehicleList = data;
      
        Object.assign(this.vehicleList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}



