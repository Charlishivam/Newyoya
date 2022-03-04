import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.scss']
})
export class ProcesslistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  processList !: any;
  data:any;
  processId:any;

constructor(private masterService:MasterService) { }

currentpage : number;
ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Master' }, { label: 'Process', active: true }];
  this.currentpage = 1;

  this.loadData();
}

loadData(){
  this.processList = this.masterService.getProcess().subscribe(data => {
    this.processList = data;
  });
}
deleteFormAction(processId) {
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
      this.masterService.deleteProcessById(processId).subscribe(res => {
        this.processList = res;
        if(this.processList.status == true){
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
