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
 } 

}
