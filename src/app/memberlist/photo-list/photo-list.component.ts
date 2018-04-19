import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../service/Auth.service';
import { UserService } from '../../service/User.service';
import { AlertService } from '../../service/alert.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  @Input() photos: Photo[];
  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public baseURL = environment.baseUrl;
  public currentMain: Photo;
  @Output() mainPhotochange = new EventEmitter<string>();
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor(
    private auth: AuthService,
    private user: UserService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseURL + 'user/' + this.auth.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('TokenString'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          isMain: res.isMain,
          dateadded: res.dateadded,
          description: res.description
        };
        if (photo.isMain) {
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'UserDetails',
            JSON.stringify(this.auth.currentUser)
          );
        }
        this.photos.push(photo);
      }
    };
  }
  setMainPhoto(photo: Photo) {
    this.currentMain = _.findWhere(this.photos, { isMain: true });
    this.user.setMainPhoto(this.auth.decodeToken.nameid, photo.id).subscribe(
      () => {
        this.currentMain.isMain = false;
        photo.isMain = true;
        // this.mainPhotochange.emit(photo.url);
        this.auth.changeMemberPhoto(photo.url);
        this.auth.currentUser.photoUrl = photo.url;
        localStorage.setItem(
          'UserDetails',
          JSON.stringify(this.auth.currentUser)
        );
      },
      error => {
        this.alert.error(error);
      }
    );
  }

  onDeletePhoto(photo: Photo) {
    this.alert.confirm('Are you sure to delete this photo', () => {
      this.user.DeletePhoto(this.auth.decodeToken.nameid, photo.id).subscribe(
        () => {
          this.photos.splice(_.findIndex(this.photos, {id : photo.id}, 1));
          this.alert.success('Photo deleted successfully');
        },
        error => {
          this.alert.error(error);
        }
      );
    });
  }
}
