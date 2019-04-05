import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generic component that displays html/markdown content-
 * Usable as a routable component.
 * Provide the name of the content in the route's data.
 */
@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent implements OnInit {
  contentName$: Observable<string>;
  constructor(route: ActivatedRoute) {
    this.contentName$ = route.data.pipe(map(data => data.contentName));
  }
  ngOnInit() {}
}
