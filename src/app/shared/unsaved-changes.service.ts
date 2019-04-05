import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder, OverlayConfig } from '@angular/cdk/overlay';
import { UnsavedConfirmComponent } from './unsaved-confirm/unsaved-confirm.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesService {
  overlayRef: OverlayRef;

  _override = false;

  constructor(private overlay: Overlay, private positionBuilder: OverlayPositionBuilder) {}

  /**
   * Display the confirmation overlay, optionally attached to an element
   * (like a submit button).
   * @param contextElement
   */
  showConfirmation(contextElement?) {
    if (this._confirmationExists()) {
      this._removeConfirmation();
    }

    const overlayOptions: OverlayConfig = {
      height: '400px',
      width: '600px'
    };
    if (contextElement) {
      const positionStrategy = this.positionBuilder
        .flexibleConnectedTo(contextElement)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetX: 0,
            offsetY: 5
          }
        ]);
      overlayOptions.positionStrategy = positionStrategy;
    }

    this.overlayRef = this.overlay.create(overlayOptions);
    const userProfilePortal = new ComponentPortal(UnsavedConfirmComponent);
    const component = this.overlayRef.attach(userProfilePortal);
    const outcome = new Subject<boolean>();

    component.instance.close.subscribe(ev => {
      outcome.next(false);
      this._removeConfirmation();
    });

    component.instance.ignore.subscribe(ev => {
      outcome.next(true);
      this._removeConfirmation();
    });

    return outcome;
  }

  private _confirmationExists() {
    return this.overlayRef && !!this.overlayRef.overlayElement;
  }

  private _removeConfirmation() {
    this.overlayRef.dispose();
  }
}
