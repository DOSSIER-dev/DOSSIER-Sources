import { Injectable, ElementRef } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UnsavedChangesService } from '../shared/unsaved-changes.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  getDeactivateContextElement: () => HTMLElement | ElementRef<any>;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private unsavedChangesService: UnsavedChangesService) {}

  canDeactivate(component: CanComponentDeactivate) {
    // If component has canDeactivate and signals cannot deactivate
    // show confirmation and block
    if (component.canDeactivate && !component.canDeactivate()) {
      const attachTo = component.getDeactivateContextElement
        ? component.getDeactivateContextElement()
        : null;
      return this.unsavedChangesService.showConfirmation(attachTo);
    }
    return true;
  }
}
