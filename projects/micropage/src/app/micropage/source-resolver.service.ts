import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Source } from './source';
import { SourceService } from './source.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SourceResolver implements Resolve<Source> {
  constructor(private sourceService: SourceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Source> {
    const id = route.params['id'];
    return this.sourceService.getSource(id).pipe(
      catchError(err => {
        console.error(err);
        this.router.navigate(['/notfound'], { skipLocationChange: true });
        return of(null);
      })
    );
  }
}
