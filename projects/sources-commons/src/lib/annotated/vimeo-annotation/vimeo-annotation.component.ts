import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnnotationComponent } from '../annotation.component';
import { Annotation } from '../annotation';
import { SourceRef } from '../sourceref';

import Player from '@vimeo/player';

@Component({
  selector: 'app-video',
  templateUrl: './vimeo-annotation.component.html',
  styleUrls: ['./vimeo-annotation.component.scss']
})
export class VimeoAnnotationComponent implements AnnotationComponent, OnInit {
  _resourceUrl = '';
  _source: SourceRef;
  _annotations: Annotation[] = [];
  _activeAnntation: Annotation;
  _addMode = false;

  _loadingEmmited = false;
  _bufferingHappend = false;

  @Input() set source(source: SourceRef) {
    this._source = source;
    // After source is set, init the player / load video
    if (this._source) {
      this.initVideoPlayer();
    }
  }

  get source() {
    return this._source;
  }

  @Input() set resourceUrl(url) {
    this._resourceUrl = url;
  }

  get resourceUrl() {
    return this._resourceUrl;
  }

  @Input() set annotations(annotations: Annotation[]) {
    // this._annotations = annotations;
  }

  get annotations() {
    return this._annotations;
  }

  @Input() set activeAnnotation(annotation: Annotation) {
    // instead of this, the goToAnnotation is used
    // TODO: can one be dropped

    // TODO: must wait for component to be initialised
    // this.goToAnnotation(annotation);
  }

  get activeAnnotation() {
    return this._activeAnntation;
  }

  @Input() set addMode(state: boolean) {
    if ( state ) {
      // create annotation at the current player position
      const annotation = new Annotation();
      this.player.getCurrentTime().then(
        secs => {
          annotation.timecodeFrom = Math.round( +secs );
          this.added.emit( annotation );
        },
        _ => {
          annotation.timecodeFrom = 0;
          this.added.emit( annotation );
        }
      );
    }
  }

  get addMode() {
    return this._addMode;
  }

  @Input() viewMode;

  @Output() added: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() selected: EventEmitter<Annotation> = new EventEmitter<Annotation>();
  @Output() interacted: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  player: Player;

  constructor() {
  }

  ngOnInit() {
  }

  initVideoPlayer() {
    this.player = new Player('annotation-player', { id: this._source.externalServiceId, width : 640 } );
    //player.setVolume(0);
    this.player.on( 'loaded', function() {
      this.loaded.emit( true );
      this._loadingEmmited = true;
    });
    this.player.on( 'play', function() {
    });
    this.player.play();
  }

  goToAnnotation(anno: Annotation) {
    const seconds = +anno.timecodeFrom;
    this.player.setCurrentTime( seconds );
    // there is no real screen location (yet) for the video player
    // we transmit as box roughly the player size
    // (but keep y = 0 for the moment, as the anchor element is below
    // the video embed)
    this.interacted.emit(
      {
        x: 0,
        y: 0,
        width: 500,
        height: 0,
        static: true
      }
    );
  }

}
