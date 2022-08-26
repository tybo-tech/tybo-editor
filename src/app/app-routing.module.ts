import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout/layout.component';
import { PageViewerComponent } from './public/page-viewer/page-viewer.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { WorkspaceComponent } from './account/workspace/workspace.component';
import { HomeComponent } from './account/home/home.component';
import { CreateANewWebsiteComponent } from './account/create-a-new-website/create-a-new-website.component';
import { WebsiteBasicDetailsComponent } from './account/website-basic-details/website-basic-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', component: PageViewerComponent},
  { path: 'pages', component: PageViewerComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/workspace', component: WorkspaceComponent },
  { path: 'account/create-a-new-website', component: CreateANewWebsiteComponent },
  { path: 'account/website-basic-details', component: WebsiteBasicDetailsComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'pages/:id', component: PageViewerComponent },
  { path: 'pages/:id/:id2', component: PageViewerComponent },
  { path: 'pages/:id/:id2/:id3', component: PageViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
