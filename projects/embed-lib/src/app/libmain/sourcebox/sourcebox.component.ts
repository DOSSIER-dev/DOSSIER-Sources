import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SourceElement } from '../source-element';
import { OptionsService } from '../options.service';

@Component({
  selector: 'app-sourcebox',
  templateUrl: './sourcebox.component.html',
  styles: []
})
export class SourceboxComponent implements OnInit {
  aboutLink: string;
  @Input() sources: SourceElement[];
  @Output() activated: EventEmitter<SourceElement> = new EventEmitter<SourceElement>();
  constructor(private options: OptionsService) {
    this.aboutLink = options.options.appserver + '/about';
  }

  ngOnInit() {}

  activateSource(source: SourceElement) {
    this.activated.emit(source);
  }
}
