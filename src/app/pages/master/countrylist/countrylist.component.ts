import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.scss']
})
export class CountrylistComponent implements OnInit {
    // bread crumb items
    breadCrumbItems: Array<{}>;
    formData: FormGroup;
    submitted = false;
    error: any;
    countryList !: any;
    data:any;
    messages:any;
    

  constructor(private masterService:MasterService) { }
  currentpage : number;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'Country', active: true }];
    this.currentpage = 1;
    this.loadData();

  }
  loadData(){
    this.countryList = this.masterService.getCountry().subscribe(data => {
      this.countryList = data;
    });
  }
  deleteFormAction(id:number){
    this.masterService.deleteCountryById(id).subscribe(res => {
      this.messages = this.messages.filter(data => data.id !== id);
       // this.toastr.success("Currency deleted successfully!", 'success', { timeOut: 2500 });
        this.loadData();

    })
  }

 
}
