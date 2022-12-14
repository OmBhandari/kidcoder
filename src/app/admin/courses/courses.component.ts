import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  baseurl = this.api.baseurl;
  courses:any=[];
  page : number = 1;
  itemsPerPage = 3;
  totalItems : any;

  constructor(private api:ApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.api.post("admin/courses", {}).subscribe((result:any)=>{
      this.courses = result.data;
      this.page =  0;
      this.totalItems = result.totalCourses;
      console.log(this.courses);
    });
  }

  deleteCourse(id:string){
    if(confirm("Sure to delete?")){
      this.api.post("admin/deletecourse", {data:{id:id}}).subscribe((result:any)=>{
        this.load();
      });
    }
  }
}
