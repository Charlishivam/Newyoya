import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';


@Component({
  selector: 'app-cityview',
  templateUrl: './cityview.component.html',
  styleUrls: ['./cityview.component.scss']
})
export class CityviewComponent implements OnInit {
  cityId: any;
  cityList: any;
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
    this.cityId = this.activatedRouter.snapshot.params['id'];

  
    if (this.cityId) {
      this.masterService.getCityById(this.cityId).toPromise().then(data => {
        this.cityList = data;
      
        Object.assign(this.cityList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}
