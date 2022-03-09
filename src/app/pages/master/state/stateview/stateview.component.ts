import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-stateview',
  templateUrl: './stateview.component.html',
  styleUrls: ['./stateview.component.scss']
})
export class StateviewComponent implements OnInit {

  stateId: any;
  stateList: any;
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
    this.stateId = this.activatedRouter.snapshot.params['id'];

  
    if (this.stateId) {
      this.masterService.getStateById(this.stateId).toPromise().then(data => {
        this.stateList = data;
      
        Object.assign(this.stateList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}

