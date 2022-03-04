import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taxlist',
  templateUrl: './taxlist.component.html',
  styleUrls: ['./taxlist.component.scss']
})
export class TaxlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  taxList !: any;
  data: any;
  taxId: any;


  constructor(private masterService: MasterService) { }

  currentpage: number;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'tax', active: true }];
    this.currentpage = 1;
    this.loadData();

  }

  loadData() {
    this.taxList = this.masterService.getTax().subscribe(data => {
      this.taxList = data;

    });
  }
  deleteFormAction(taxId) {
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
        this.masterService.deleteTaxById(taxId).subscribe(res => {
          this.taxList = res;
          if(this.taxList.status == true){
            Swal.fire('Deleted!', 'Data has been deleted.', 'success');
          }else{
            Swal.fire('Data Not Update !', 'Data not updated successfully! ', 'success');
          }
          this.loadData();
        })
      }
    });
  }
}
