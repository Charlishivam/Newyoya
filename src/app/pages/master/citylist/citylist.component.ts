import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.scss']
})
export class CitylistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   success: any;
   cityList !: any;
   data:any;
   cityId:any;
  
   

 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'City', active: true }];
   this.currentpage = 1;
   this.loadData();
  }

  loadData(){
    this.cityList = this.masterService.getCity().subscribe(data => {
      this.cityList = data;
    });
  }
  deleteFormAction(cityId) {
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
        this.masterService.deleteCityById(cityId).subscribe(res => {
          this.cityList = res;
          if(this.cityList.status == true){
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


