import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataList:any=[]
  constructor(public route: Router) {}
  ngOnInit() {
  let infoData:any = localStorage.getItem('listData')
if(infoData){
  this.dataList=JSON.parse(infoData)
}
    console.log(this.dataList,'============')
  }

  // function add-edit form

  openForm(data:any,type: any) {
    console.log(type, '=====');
    type=='add' ? (this.route.navigate(['/form'], { queryParams: { type: type } })):(this.route.navigate(['/form'], { queryParams: { type: type,data:JSON.stringify(data) } }))
  }
//function for delete
DeleteItem(data:any,index:any){
console.log(data,index)
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this data!",
  type: 'warning',
  showConfirmButton: true,
  showCancelButton: true
})
.then((data:any) => {
    if(data){
      this.dataList?.splice(index,1)
    }else{

    }

  console.log(data)
});
}



}
