import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-currencylist',
  templateUrl: './currencylist.component.html',
  styleUrls: ['./currencylist.component.scss']
})
export class CurrencylistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  currencyList !: any;
  data: any;
  currencies_id:any;
  item : any;
  messages : any;

  constructor(private masterService: MasterService) { }

  currentpage: number;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'Currency', active: true }];
    this.currentpage = 1;
    this.loadData();

  }
  
  loadData(){
    this.currencyList = this.masterService.getAllCurrency().subscribe(data => {
      this.currencyList = data;
    });
  }

  deleteFormAction(id:number){
    this.masterService.deleteCurrencyById(id).subscribe(res => {

     
      this.messages = this.messages.filter(data => data.id !== id);
       // this.toastr.success("Currency deleted successfully!", 'success', { timeOut: 2500 });
        this.loadData();

    })
  }
}
