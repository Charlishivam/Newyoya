import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-outstationview',
  templateUrl: './outstationview.component.html',
  styleUrls: ['./outstationview.component.scss']
})
export class OutstationviewComponent implements OnInit {

  outstationId: any;
  outstationList: any;
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
    this.outstationId = this.activatedRouter.snapshot.params['id'];

  
    if (this.outstationId) {
      this.masterService.getOutstatiopriceById(this.outstationId).toPromise().then(data => {
        this.outstationList = data;
      
        Object.assign(this.outstationList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}





