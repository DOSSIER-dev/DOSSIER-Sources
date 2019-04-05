import { Directive, ViewContainerRef } from '@angular/core';

/**
 * This helper-directive allows to dynamically load and display a component.
 */
@Directive({
  selector: '[appComponentHost]'
})
export class ComponentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

