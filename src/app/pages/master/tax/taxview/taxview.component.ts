import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-taxview',
  templateUrl: './taxview.component.html',
  styleUrls: ['./taxview.component.scss']
})
export class TaxviewComponent implements OnInit {

  taxId: any;
  taxList: any;
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
    this.taxId = this.activatedRouter.snapshot.params['id'];

  
    if (this.taxId) {
      this.masterService.getTaxById(this.taxId).toPromise().then(data => {
        this.taxList = data;
      
        Object.assign(this.taxList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}


