import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../service/User.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AlertService } from '../../service/alert.service';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  galleryOptions?: NgxGalleryOptions[];
  galleryImages?: NgxGalleryImage[];
  userDetail: User;
  constructor(
    private _user: UserService,
    private route: ActivatedRoute,
    private alertify: AlertService
  ) {}

  ngOnInit() {
    // this.loaduser();
    this.route.data.subscribe(data => {
      this.userDetail = data['user'];
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const images = [];
    for (let i = 0; i < this.userDetail.photos.length; i++) {
      images.push({
        small: this.userDetail.photos[i].url,
        medium: this.userDetail.photos[i].url,
        large: this.userDetail.photos[i].url,
        description: this.userDetail.photos[i].description
      });
    } return images;
  }
}
