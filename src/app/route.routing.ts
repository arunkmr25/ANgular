import { MemberListResolver } from './_Resolvers/member-list.resolver';
import { MemberDetailResolver } from './_Resolvers/member-detail.resolver';
import { MemberDetailComponent } from './memberlist/member-detail/member-detail.component';
import { AuthguardGuard } from './_Guard/authguard.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanActivate } from '@angular/router';
import { MemberEditComponent } from './memberlist/member-edit/member-edit.component';
import { MemberEditResolver } from './_Resolvers/member-edit.resolver';
import { UnSavedChanges } from './_Guard/prevent-unsavedchanges.guard';

export const RouteRoutes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolver: 'always',
    canActivate: [AuthguardGuard],
    children: [
      { path: 'matches', component: MemberlistComponent, resolve: { users: MemberListResolver} },
      { path: 'matches/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver}},
      { path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver}, canDeactivate: [UnSavedChanges]},
      { path: 'list', component: ListsComponent },
      { path: 'messages', component: MessagesComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
