import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-normalview',
  templateUrl: './normalview.component.html',
  styleUrls: ['./normalview.component.scss']
})
export class NormalviewComponent implements OnInit {

  normalId: any;
  normalList: any;
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
    this.normalId = this.activatedRouter.snapshot.params['id'];

  
    if (this.normalId) {
      this.masterService.getNormalpriceById(this.normalId).toPromise().then(data => {
        this.normalList = data;
      
        Object.assign(this.normalList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}




