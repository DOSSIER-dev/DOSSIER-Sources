import { Output, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirm-panel',
  templateUrl: './delete-confirm-panel.component.html',
  styleUrls: ['./delete-confirm-panel.component.scss']
})
export class DeleteConfirmPanelComponent {
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  cancelClick() {
    this.cancel.next();
  }
  deleteClick() {
    this.delete.next();
  }
}
