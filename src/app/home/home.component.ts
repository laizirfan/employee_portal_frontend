import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import { dematerialize } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
 selected :Date | null = new Date()
 Highcharts : typeof Highcharts = Highcharts;
 chartOptions = {};

 status:boolean=true
 TotalEmployee:number=0
 adminDetail:any={}
 profileImage:string='https://th.bing.com/th/id/OIP.rOyRdmkq1AifowuTffpKAQAAAA?rs=1&pid=ImgDetMain'

editStatus:boolean=true
 constructor(private api:ApiService){
  
  this.chartOptions= {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Project Completion'
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    credits:{
      enabled:false
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Project Fair',
                    y: 55.02
                },
                {
                    name: 'E-Commerce',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Redux E-cart',
                    y: 1.09
                },
                {
                    name: 'Simple Interest',
                    y: 15.5
                },
                {
                    name: 'Media-Player',
                    y: 1.68
                }
            ]
        }
    ]


 }
}
ngOnInit(): void {
    this.getTotalEmployee()
     this.api.loginApi().subscribe({
        next:(res:any)=>{console.log(res);
            this.adminDetail=res
            if(res.picture){
                this.profileImage=res.picture
            }
        },
        error:(err:any)=>{
            console.log(err);
            
        }
     })
}
getEditStatus(){
    this.editStatus=false
}

getTotalEmployee(){
this.api.getAllEmployeeApi().subscribe({
    next:(res:any)=>{
console.log(res);
 this.TotalEmployee=res.length-1

    },
    error:(err:any)=>{
        console.log(err);
        
    }
})
}
getFile(event:any){
    console.log(event.target.files[0]);

    //to convert image url first object
    const file = new FileReader()
//conversion url
    file.readAsDataURL(event.target.files[0])
    //to get url
    file.onload=(event:any)=>{
  this.profileImage = event.target.result
    ///adding 
  this.adminDetail.picture= this.profileImage
    
    }
    
}
reset(){
this.api.loginApi().subscribe({

    next:(res:any)=>{console.log(res);
        this.adminDetail=res
        this.editStatus=true
        if(res.picture){
            this.profileImage=res.picture
        }
        else{
            this.profileImage='https://th.bing.com/th/id/OIP.rOyRdmkq1AifowuTffpKAQAAAA?rs=1&pid=ImgDetMain'
        }
    },
    error:(err:any)=>{
        console.log(err);
        
    }
})
}
updateAdmin(){
 this.api.updateAdminApi(this.adminDetail).subscribe({
    next:(res:any)=>{
        console.log(res);
        this.adminDetail=res
        this.profileImage=res.picture
        this.editStatus=true
       Swal.fire({
        title:'wow',
        text:'Updated',
        icon:'success'
       })

        
    },
    error:(err:any)=>{
             console.log(err);

    }
 })
}

changeStat(){
    this.status=!this.status
}

}
