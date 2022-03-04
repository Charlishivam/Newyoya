import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-languagetranslationlist',
  templateUrl: './languagetranslationlist.component.html',
  styleUrls: ['./languagetranslationlist.component.scss']
})
export class LanguagetranslationlistComponent implements OnInit {

   // bread crumb items
   breadCrumbItems: Array<{}>;
   formData: FormGroup;
   submitted = false;
   error: any;
   languagetranslationList !: any;
   data:any;
   lang_trans_id:any;

 constructor(private masterService:MasterService) { }
 
 currentpage : number;
 ngOnInit(): void {
   this.breadCrumbItems = [{ label: 'Master' }, { label: 'Language Translation', active: true }];
   this.currentpage = 1;
   this.loadData();

  }
  
  loadData(){
    this.languagetranslationList = this.masterService.getLanguagetranslation().subscribe(data => {
      this.languagetranslationList = data;
    });
  }
  deleteFormAction(lang_trans_id) {
    this.masterService.deleteLanguagetranslationById({ lang_trans_id: lang_trans_id })
    .then((response: any) => {
      if (!response.status) {
        Swal.fire('Not Deleted!', response.message, 'success');
        return;
      }
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
          Swal.fire('Deleted!', 'Data has been deleted.', 'success');
          this.loadData();
        }
      });
    })
    .catch(err => console.log(err))
  }

}
