import { Component, OnInit } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit{

allEmployee:EmpModel[]=[]

AdminLogin:any= new Date ()
searchKey:string=""
p: number = 1;


constructor(private api:ApiService){}
ngOnInit(): void {
  this.getAllEmployee()
}



getAllEmployee(){
this.api.getAllEmployeeApi().subscribe({
  next:(res:any)=>{
      //  console.log(res);
        this.allEmployee=res
  },
  error:(err:any)=>{
    // console.log(err);
  }
})
}
sortId(){
  this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
}


sortName(){
  this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  
}

removeEmploye(id:string){
  this.api.deleteEmpApi(id).subscribe({
    next:(res:any)=>{
      // console.log(res);
      this.getAllEmployee()
      
    },
    error:(err:any)=>{console.log(err);
    }
  })
}

generatePdf(){
 
  //1)create object
  const pdf = new jsPDF()

  const head=[['UserId','Username','Email','Status']]

  const body:any=[]

  this.allEmployee.forEach((item)=>{
  if(item.id!=='1'){
    if(item.status=='1'){
      body.push([item.id,item.name,item.email,'Active'])
    }
    else{
      body.push([item.id,item.name,item.email,'Not Active'])
    }
  }
 
  })

pdf.setFontSize(16)

pdf.text('Employee Details',10,10)

//call autotabel
  autoTable(pdf,{head,body})


 //new window
  pdf.output('dataurlnewwindow')


  //3 save doc
  pdf.save('employe_Table.pdf')
}





}

