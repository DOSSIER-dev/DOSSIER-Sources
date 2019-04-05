import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Source } from '../source';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-editbar',
  styleUrls: ['./editbar.component.scss'],
  templateUrl: './editbar.component.html'
})
export class EditbarComponent implements OnChanges {
  @Input() source: Source;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() replace = new EventEmitter<string>();
  @Output() none = new EventEmitter<string>();
  sourceUrl = '';

  actions = [];
  deleteaction = {
    emitter: this.delete,
    text: 'SOURCE.TOOLTIP.EDITBAR_DELETE',
    icon: 'src-tool-delete',
    class: ''
  };
  downloadaction = {
    emitter: null,
    text: 'SOURCE.TOOLTIP.EDITBAR_DOWNLOAD',
    icon: 'src-tool-download',
    class: ''
  };

  constructor(private urlService: UrlService) {
    this.actions = [
      {
        emitter: this.edit,
        text: 'SOURCE.TOOLTIP.EDITBAR_EDIT',
        icon: 'src-tool-edit',
        class: ''
      },
      {
        emitter: this.replace,
        text: 'SOURCE.TOOLTIP.EDITBAR_REPLACE',
        icon: 'src-tool-replace',
        class: ''
      }
    ];
  }

  emitAction(action) {
    action.emitter.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      this.sourceUrl = this.source ? this.urlService.getSourceUrl(this.source) : '';
    }
  }
}
