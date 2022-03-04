import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  error: any;
  stateList !: any;
  data: any;
  stateId :any;

  constructor(private masterService: MasterService) { }

  currentpage: number;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Master' }, { label: 'State', active: true }];
    this.currentpage = 1;
    this.loadData();

  }

  loadData(){
    this.stateList = this.masterService.getState().subscribe(data => {
      this.stateList = data;
    });
  }
  deleteFormAction(stateId) {
  }

}
