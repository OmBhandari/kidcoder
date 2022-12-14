import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseurl = this.api.baseurl;
  teachers: any;
  classes:any;
  page : number = 1;
  itemsPerPage = 3;
  totalItems : any;
  
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.post("admin/teachers", {}).subscribe((result: any) => {
      this.teachers = result.data;
      console.log(this.teachers);
    });

    this.api.post("admin/courses", {}).subscribe((result:any)=>{
      this.classes = result.data;
      this.page =  0;
      this.totalItems = result.totalCourses;
      console.log(this.classes);
    })
  }
  
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: true
  }
}
