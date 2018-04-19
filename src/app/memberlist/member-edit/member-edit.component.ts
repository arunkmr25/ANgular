import { Component, OnInit , ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { AlertService } from '../../service/alert.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/User.service';
import { AuthService } from '../../service/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  userDetail: User;
  photourl: string;
  @ViewChild('editform') editform: NgForm;
  constructor(private route: ActivatedRoute,
     private alert: AlertService,
      private user: UserService,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.userDetail = data['user'];
    });
    this.auth.currentPhotoURL.subscribe(photourl => this.photourl = photourl);
  }
  updateUser() {
    this.user.updateUser(this.auth.decodeToken.nameid , this.userDetail).subscribe(next => {
      this.alert.success('successfully updated user details');
    this.editform.reset(this.userDetail);
    });
  }
  onSetMainPhoto(photo) {
    this.userDetail.photoUrl = photo;
  }

}
