import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout/layout.component';
import { PageViewerComponent } from './public/page-viewer/page-viewer.component';

const routes: Routes = [
  // { path: '/', component: LayoutComponent },
  { path: '', component: PageViewerComponent },
  { path: 'pages', component: PageViewerComponent },
  { path: 'pages/:id', component: PageViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
