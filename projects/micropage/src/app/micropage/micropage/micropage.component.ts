import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Source } from '../source';
import { Annotation } from '../annotation';
import { filter, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AnnotationPanelService } from 'sources-commons';
import { StatsService } from '../stats.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-micropage',
  templateUrl: './micropage.component.html',
  styleUrls: ['./micropage.component.scss']
})
export class MicropageComponent implements OnInit {
  source: Source;
  activeAnnotation: Annotation;
  isStaticAnnotationDisplay = false;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  aboutLink = environment.sourcesProjectPage;
  timestamp: number;

  @ViewChild('panel', { static: true }) panel;

  hasAnnotations = false;

  //
  // Don't listen on click or scroll
  //
  // @HostListener('click', ['$event'])
  // onClick(what) {
  //   this._registerUserEvent();
  // }
  // @HostListener('window:scroll', ['$event'])
  // onScroll(what) {
  //   this._registerUserEvent();
  // }

  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService,
    private panelService: AnnotationPanelService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { source: Source; annotationId?: number }) => {
      this.source = data.source;
      this.hasAnnotations = (this.source && this.source.annotations || []).length > 0;
      if (data.annotationId) {
        // annotation id was found in route
        const preselectedAnnotation = this.source.annotations.find(
          v => v.id === +data.annotationId
        );
        if (preselectedAnnotation) {
          this.loaded$
            .pipe(
              filter(v => !!v),
              take(1)
            )
            .subscribe(state => {
              // But only now, when viewer is ready do we set the annotation
              this.activeAnnotation = preselectedAnnotation;
            });
        }
      }
    });
  }

  selectAnnotation(a: Annotation) {
    this.activeAnnotation = a;
  }

  setInteraction(event) {
    const el = this.panel.nativeElement;
    this.panelService.positionPanel(el, event);
    this.isStaticAnnotationDisplay = this.panelService.getIsStaticPanel();
  }

  viewerReady(state) {
    this.loaded$.next(state);
  }

  // _registerUserEvent() {
  //   const t = new Date().getTime();
  //   if (this.timestamp === undefined || t - this.timestamp > 5000) {
  //     this.statsService.registerActivity(this.source.embedId, 'activity')
  //       .subscribe(_ => {
  //       });
  //     this.timestamp = t;
  //   }
  // }
}
