import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Employee:any={}


  constructor(private api: ApiService, private route: ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const { id } = res

      this.getAemploye(id)

    })
  }




  getAemploye(id: any) {
    this.api.getAemployee(id).subscribe({
      next: (res: any) => {
       this.Employee=res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  cancel(id:any){
   this.getAemploye(id)
  }

  editEmploye(id:any){
this.api.updateEmpdetailsApi(id,this.Employee).subscribe({
  next:(res:any)=>{
      console.log(res);
      Swal.fire({
        title:'Updated',
        text:'Employee Updated',
        icon:'success'
      })
      this.router.navigateByUrl('/employee')    
  },
  error:(err:any)=>{
    console.log(err);
    
  }

})
  }
}


