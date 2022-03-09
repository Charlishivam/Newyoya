import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-currencyview',
  templateUrl: './currencyview.component.html',
  styleUrls: ['./currencyview.component.scss']
})
export class CurrencyviewComponent implements OnInit {

  currencyId: any;
  currencyList: any;
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
    this.currencyId = this.activatedRouter.snapshot.params['id'];

  
    if (this.currencyId) {
      this.masterService.findCurrency(this.currencyId).toPromise().then(data => {
        this.currencyList = data;
        Object.assign(this.currencyList, data);
        this.dataloader = true;
      }).catch(err => {
        console.log(err);
      })
    } 
  }

}

