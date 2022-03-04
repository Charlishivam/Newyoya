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
  deleteFormAction(countryId){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.masterService.deleteCountryById(countryId).subscribe(res => {
          this.countryList = res;
          if(this.countryList.status == true){
            Swal.fire('Deleted!', 'Data has been deleted !', 'success');
          }else{
            Swal.fire('Deleted !', 'Data has not been deleted !', 'success');
          }
          this.loadData();
        })
      }
    });
  }
}
