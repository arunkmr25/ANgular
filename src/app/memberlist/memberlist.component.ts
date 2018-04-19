import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/User.service';
import { User } from '../models/User';
import { Pagination, PaginationResult } from '../models/Pagination';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {
  User: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('UserDetails'));
  genderList = [{value : 'male', display : 'males'}, {value : 'female', display : 'females'}];
  userParams: any = {};
  constructor(private _user: UserService, private route: ActivatedRoute , private alert: AlertService) {
   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.User = data['users'].body;
      this.pagination = JSON.parse(data['users'].headers.get('pagination'));
    });
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }
  loadUsers() {
    this._user.getUsers(this.pagination.currentPage , this.pagination.itemsPerPage, this.userParams).subscribe((res) => {
      this.User = res.body;
      this.pagination = JSON.parse(res.headers.get('pagination'));
    }, error => {
      this.alert.error(error);
    } );
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === 'male' ? 'female' : 'male';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }
   pageChanged(event: PageChangedEvent): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
   }
  // loadUsers() {
  //  this._user.getUsers().subscribe(opt => {
  //    this.User = opt;
  //    console.log(this.User);
  //  });
  // }
}
