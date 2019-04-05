import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { DeleteConfirmPanelComponent } from './delete-confirm-panel.component';
import { Overlay, OverlayPositionBuilder, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmPanelService {
  overlayRef: OverlayRef;
  stop = new Subject<any>();
  constructor(private overlay: Overlay, private positionBuilder: OverlayPositionBuilder) {}

  showConfirmation(contextElement?) {
    if (this.confirmationExists()) {
      this.removeConfirmation();
    }

    const overlayOptions: OverlayConfig = {
      width: '320px',
      height: '200px'
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
    const userProfilePortal = new ComponentPortal(DeleteConfirmPanelComponent);
    const component = this.overlayRef.attach(userProfilePortal);
    const outcome = new Subject<boolean>();

    component.instance.delete.subscribe(_ => {
      outcome.next(true);
      this.removeConfirmation();
    });

    component.instance.cancel.subscribe(_ => {
      outcome.next(false);
      this.removeConfirmation();
    });

    return outcome.pipe(
      takeUntil(this.stop),
      take(1)
    );
  }

  confirmationExists() {
    return this.overlayRef && !!this.overlayRef.overlayElement;
  }

  removeConfirmation() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.stop.next();
  }
}
