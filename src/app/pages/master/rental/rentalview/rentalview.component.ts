import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-rentalview',
  templateUrl: './rentalview.component.html',
  styleUrls: ['./rentalview.component.scss']
})
export class RentalviewComponent implements OnInit {
  rentalId: any;
  rentalList: any;
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
    this.rentalId = this.activatedRouter.snapshot.params['id'];

  
    if (this.rentalId) {
      this.masterService.getRentalpriceById(this.rentalId).toPromise().then(data => {
        this.rentalList = data;
      
        Object.assign(this.rentalList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}




