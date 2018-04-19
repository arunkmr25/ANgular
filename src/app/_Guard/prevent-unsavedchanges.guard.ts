import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router/src/interfaces';
import { MemberEditComponent } from '../memberlist/member-edit/member-edit.component';
@Injectable()
export class UnSavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editform.dirty) {
            return confirm('Are you sure of leaving this page. changes will be lost!');
        } else {
            return true;
        }
    }
}
