import { MemberListResolver } from './_Resolvers/member-list.resolver';
import { MemberDetailResolver } from './_Resolvers/member-detail.resolver';
import { MemberDetailComponent } from './memberlist/member-detail/member-detail.component';
import { AuthguardGuard } from './_Guard/authguard.guard';
import { RouteRoutes } from './route.routing';
import { RouterModule, RouteConfigLoadStart } from '@angular/router';
import { AlertService } from './service/alert.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './service/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './service/User.service';
import { AuthInterceptor } from './AuthInterceptor';
import { MemberCardComponent } from './memberlist/member-card/member-card.component';
import { MemberEditComponent } from './memberlist/member-edit/member-edit.component';
import { MemberEditResolver } from './_Resolvers/member-edit.resolver';
import { UnSavedChanges } from './_Guard/prevent-unsavedchanges.guard';
import { PhotoListComponent } from './memberlist/photo-list/photo-list.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TimeAgoPipe} from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberlistComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoListComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(RouteRoutes),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertService,
    AuthguardGuard,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MemberDetailResolver ,
    MemberListResolver,
    MemberEditResolver,
    UnSavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
