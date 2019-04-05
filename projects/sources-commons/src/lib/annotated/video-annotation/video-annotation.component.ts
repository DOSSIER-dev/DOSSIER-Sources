import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { AnnotationComponent } from '../annotation.component';
import { Annotation } from '../annotation';
import { SourceRef } from '../sourceref';

import YouTubePlayer from 'youtube-player';

// https://github.com/gajus/youtube-player/blob/master/src/constants/PlayerStates.js
const PlayerStates = {
  BUFFERING: 3,
  PLAYING: 1,
  UNSTARTED: -1
};
@Component({
  selector: 'app-video',
  templateUrl: './video-annotation.component.html',
  styleUrls: ['./video-annotation.component.scss']
})
export class VideoAnnotationComponent implements AnnotationComponent, OnInit {
  _resourceUrl = '';
  _source: SourceRef;
  _annotations: Annotation[] = [];
  _activeAnntation: Annotation;
  _addMode = false;

  _loadingEmmited = false;
  _bufferingHappend = false;

  @Input() set source(source: SourceRef) {
    this._source = source;
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
    // TODO: empty (?) this._annotations = annotations;
  }

  get annotations() {
    return this._annotations;
  }

  @Input() set activeAnnotation(annotation: Annotation) {
    // TODO: activeAnnotation vs goToAnnotation()
  }

  get activeAnnotation() {
    return this._activeAnntation;
  }

  @Input() set addMode(state: boolean) {
    if (state) {
      // create annotation at the current player position
      const annotation = new Annotation();
      this.player.getCurrentTime().then(
        secs => {
          annotation.timecodeFrom = Math.round(+secs);
          this.added.emit(annotation);
        },
        _ => {
          // err in getting time
          annotation.timecodeFrom = 0;
          this.added.emit(annotation);
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

  player;

  constructor() {}

  ngOnInit() {}

  initVideoPlayer() {
    this.player = YouTubePlayer('annotation-player', {
      playerVars: { rel: false }
    });
    this.player.loadVideoById(this._source.externalServiceId).then(() => { });
    this.player.playVideo().then(() => { });

    this.player.on('stateChange', event => {

      if (event.data === PlayerStates.BUFFERING) {
        this._bufferingHappend = true;
      }

      if (event.data === PlayerStates.PLAYING) {
        if (!this._loadingEmmited) {
          this.loaded.emit(true);
          this._loadingEmmited = true;
        }
      }

      if (event.data === PlayerStates.UNSTARTED && this._bufferingHappend) {
        this.loaded.emit(true);
        this._loadingEmmited = true;
      }
    });
  }

  goToAnnotation(anno: Annotation) {
    const seconds = +anno.timecodeFrom;
    this.player.seekTo(seconds, true).then(() => { });

    // there is no real screen location (yet) for the video player
    // we transmit as box roughly the player size
    // (but keep y = 0 for the moment, as the anchor element is below
    // the video embed)
    this.interacted.emit({
      x: 0,
      y: 0,
      width: 500,
      height: 0,
      static: true
    });
  }
}
