

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-processview',
  templateUrl: './processview.component.html',
  styleUrls: ['./processview.component.scss']
})
export class ProcessviewComponent implements OnInit {

  processId: any;
  processList: any;
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
    this.processId = this.activatedRouter.snapshot.params['id'];

  
    if (this.processId) {
      this.masterService.getProcessById(this.processId).toPromise().then(data => {
        this.processList = data;
      
        Object.assign(this.processList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}



