import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-rentalpackageview',
  templateUrl: './rentalpackageview.component.html',
  styleUrls: ['./rentalpackageview.component.scss']
})
export class RentalpackageviewComponent implements OnInit {
  rentalpackageId: any;
  rentalpackageList: any;
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
    this.rentalpackageId = this.activatedRouter.snapshot.params['id'];

  
    if (this.rentalpackageId) {
      this.masterService.getRentalpackageById(this.rentalpackageId).toPromise().then(data => {
        this.rentalpackageList = data;
      
        Object.assign(this.rentalpackageList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}





