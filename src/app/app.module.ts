import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, declarations } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { ColorPickerModule } from 'ngx-color-picker';
import { DockLayoutComponent } from './dock-style/dock-styles/style-components/dock-layout/dock-layout.component';
import { DockSpacingComponent } from './dock-style/dock-styles/style-components/dock-layout/dock-spacing/dock-spacing.component';
import { DockInputComponent } from './dock-style/dock-styles/style-components/dock-layout/dock-input/dock-input.component';


@NgModule({
  declarations: [
    ...declarations,
    DockLayoutComponent,
    DockSpacingComponent,
    DockInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    DragDropModule,
    ContenteditableValueAccessorModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
