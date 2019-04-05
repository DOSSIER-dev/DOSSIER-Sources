import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <h1>404</h1>
    <p translate="MISC.NOTFOUND.TEXT"></p>
  `,
  styles: []
})
export class NotfoundViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
