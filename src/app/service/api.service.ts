import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
     
  serverUrl='http://localhost:3000'

//1)create bevaiorsubject
sharedata= new BehaviorSubject(false)


  constructor(private http:HttpClient) { }

//function to update behavior subject
updateData(data:any){
this.sharedata.next(data)
}
 
 
 
  //  here 1 is the id of admin which already 

//api to login
  loginApi(){
   return this.http.get(`${this.serverUrl}/employee/1`)
  }
//api to add
  addEmployeeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/employee`,reqBody)
  }

//api to get 
getAllEmployeeApi(){
  return this.http.get(`${this.serverUrl}/employee`)
}

//delte
deleteEmpApi(id:string){
   return this.http.delete(`${this.serverUrl}/employee/${id}`)
}

//get particular employee 
getAemployee(id:string){
 return this.http.get(`${this.serverUrl}/employee/${id}`)
}

//update api
updateEmpdetailsApi(id:any,body:any){
return this.http.put(`${this.serverUrl}/employee/${id}`,body)
}

//admin update api
updateAdminApi(body:any){
return this.http.put(`${this.serverUrl}/employee/1`,body)
}



}
