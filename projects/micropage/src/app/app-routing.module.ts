import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MicropageComponent } from './micropage/micropage/micropage.component';
import { NotfoundComponent } from './micropage/notfound/notfound.component';
import { SourceResolver } from './micropage/source-resolver.service';

const routes: Routes = [
  { path: 'notfound', component: NotfoundComponent },
  {
    path: ':id',
    component: MicropageComponent,
    resolve: {
      source: SourceResolver
    }
    // cannot be defined as child route, unfortunately
    // children: [
    //   {
    //     path: ':annotationId',
    //     component: MicropageComponent,
    //     resolve: {
    //       annotation: 'annotationResolver'
    //     },
    //   }
    // ]
  },

  {
    path: ':id/:annotationId',
    component: MicropageComponent,
    resolve: {
      source: SourceResolver,
      annotationId: 'annotationResolver'
    }
  },

  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'annotationResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = route.params['annotationId'];
        return id;
      }
    }
  ]
})
export class AppRoutingModule {}
