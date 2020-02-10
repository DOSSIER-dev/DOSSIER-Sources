import { Component, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { DeleteConfirmPanelService } from './delete-confirm-panel.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnDestroy {
  @ViewChild('confirmAnchor', { static: true }) confirmAnchor;
  @Output() delete = new EventEmitter<any>();

  constructor(private panelService: DeleteConfirmPanelService) {}

  onClick() {
    this.panelService
      .showConfirmation(this.confirmAnchor)
      .pipe(filter(action => action === true))
      .subscribe(_ => {
        this.delete.next();
      });
  }

  ngOnDestroy() {
    this.panelService.removeConfirmation();
  }
}
