import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-languageview',
  templateUrl: './languageview.component.html',
  styleUrls: ['./languageview.component.scss']
})
export class LanguageviewComponent implements OnInit {

  languageId: any;
  languageList: any;
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
    this.languageId = this.activatedRouter.snapshot.params['id'];

  
    if (this.languageId) {
      this.masterService.getLanguageById(this.languageId).toPromise().then(data => {
        this.languageList = data;
      
        Object.assign(this.languageList, data);
       
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}




