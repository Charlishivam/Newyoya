import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pushnotificationlist',
  templateUrl: './pushnotificationlist.component.html',
  styleUrls: ['./pushnotificationlist.component.scss']
})
export class PushnotificationlistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   pushNotificationList !: any;
   data:any;
   pushNotification_id:any;
 
 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'Pushnotification', active: true }];
   this.currentpage = 1;
   this.loadData();
  }
  
  loadData(){
    this.pushNotificationList = this.masterService.getpushNotification().subscribe(data => {
      this.pushNotificationList = data;
      
    });
  }
  deleteFormAction(pushNotification_id) {
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
        this.masterService.deletepushNotificationById(pushNotification_id).subscribe(res => {
          this.pushNotificationList = res;
          if(this.pushNotificationList.status == true){
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
