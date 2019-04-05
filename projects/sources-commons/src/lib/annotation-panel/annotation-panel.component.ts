import { Component, OnInit, Input } from '@angular/core';

/**
 * A "panel" / overlay window with a triangle pointing upwards.
 * It wraps inner content (<ng-content></ng-content>)-
 * See @class AnnotationPanelService which resizes and positions this component.
 */
@Component({
  selector: 'app-annotation-panel',
  templateUrl: './annotation-panel.component.html',
  styleUrls: ['./annotation-panel.component.scss']
})
export class AnnotationPanelComponent implements OnInit {
  @Input() static = false;
  constructor() { }
  ngOnInit() {
  }

}
