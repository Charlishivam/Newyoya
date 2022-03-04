import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-languagelist',
  templateUrl: './languagelist.component.html',
  styleUrls: ['./languagelist.component.scss']
})
export class LanguagelistComponent implements OnInit {

     // bread crumb items
     breadCrumbItems: Array<{}>;
     formData: FormGroup;
     submitted = false;
     error: any;
     languageList !: any;
     data:any;
     langauage_id:any;
 
   constructor(private masterService:MasterService) { }
   
   currentpage : number;
   ngOnInit(): void {
     this.breadCrumbItems = [{ label: 'Master' }, { label: 'Language', active: true }];
     this.currentpage = 1;

     this.loadData();

    }
    
    loadData(){
      this.languageList = this.masterService.getLanguage().subscribe(data => {
        this.languageList = data;
      });
    }
    deleteFormAction(langauage_id) {

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
          this.masterService.deleteLanguageById(langauage_id).subscribe(res => {
            this.languageList = res;
            if(this.languageList.status == true){
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
