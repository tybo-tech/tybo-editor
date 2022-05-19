import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextEditorComponent } from './_editors/text-editor/text-editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragableComponent } from './expamples/dragable/dragable.component';
import { DrageDropDirective } from './_directives/drag-drip-drirective';
import { LayoutComponent } from './_layout/layout/layout.component';
import { NavBarComponent } from './_layout/nav-bar/nav-bar.component';
import { PageViewerComponent } from './public/page-viewer/page-viewer.component';
import { EditorComponent } from './_editor/editor/editor.component';
import { DragDropComponent } from './expamples/drag-drop/drag-drop.component';
import { SortableListDragDropComponent } from './expamples/sortable-list-drag-drop/sortable-list-drag-drop.component';
import { ToolbarComponent } from './_layout/toolbar/toolbar.component';
import { WidgetsComponent } from './_layout/widgets/widgets.component';
import { SectionViewerComponent } from './_layout/section-viewer/section-viewer.component';
import { CardsComponent } from './_layout/layout/cards/cards.component';
import { ElementStyleComponent } from './_editor/_elelment-options/element-style/element-style.component';
import { FlexElementComponent } from './expamples/flex-element/flex-element.component';
import { CanDragMeDropDirective } from './_directives/can-drag-me-drirective';
import { CanDrogOnMeDirective } from './_directives/can-drop-on-me-directive';
import { WidNavBarComponent } from './_layout/widgets/wid-nav-bar/wid-nav-bar.component';
import { HtmlElementComponent } from './_layout/html-element/html-element.component';
import { HoveMeDirective } from './_directives/hover-me';
import { ImagePickerComponent } from './_images/image-picker/image-picker.component';
import { HerosComponent } from './_layout/layout/heros/heros.component';
import { TextWidgetComponent } from './_editors/text-widget/text-widget.component';
import { EditorDirective } from './_directives/editor.directive';
import { ResponsiMadeEasyComponent } from './expamples/responsi-made-easy/responsi-made-easy.component';
import { ResponsiveNavBarComponent } from './_layout/responsive-nav-bar/responsive-nav-bar.component';
import { LandingPageComponent } from './_layout/hero/landing-page/landing-page.component';
import { UnitsComponent } from './_layout/units/units.component';
import { ListComponent } from './_layout/layout/cards/list/list.component';
import { MenusComponent } from './_layout/layout/cards/menus/menus.component';
import { RowComponent } from './_layout/widgets/row/row.component';
import { MiniMenuComponent } from './_layout/widgets/mini-menu/mini-menu.component';
import { ColumnComponent } from './_layout/widgets/column/column.component';
import { ColumnWidgetComponent } from './_layout/widgets/column-widget/column-widget.component';
import { CardComponent } from './_layout/widgets/card/card.component';
import { FormsComponent } from './_layout/widgets/forms/forms.component';
import { InputComponent } from './_layout/widgets/forms/input/input.component';
import { PublicSectionComponent } from './public/public-section/public-section.component';
import { PublicColumnComponent } from './public/public-column/public-column.component';
import { PublicColumnWidgetComponent } from './public/public-column-widget/public-column-widget.component';
import { PageSettingsComponent } from './_editor/_settings/page-settings/page-settings.component';
import { PublicHtmlElementComponent } from './_layout/html-element/public-html-element/public-html-element.component';
import { PublicMenuComponent } from './_layout/layout/cards/menus/public-menu/public-menu.component';
import { ElementToolsComponent } from './_editor/_elelment-options/element-tools/element-tools.component';
import { OptionsComponent } from './_editor/_elelment-options/options/options.component';
import { LayersComponent } from './_editor/_elelment-options/layers/layers.component';
import { OptionsInputComponent } from './_editor/_elelment-options/options-input/options-input.component';
import { PublicFormComponent } from './_layout/widgets/forms/public-form/public-form.component';
import { PublicInputComponent } from './_layout/widgets/forms/public-input/public-input.component';
import { SideMenuComponent } from './_layout/layout/cards/menus/side-menu/side-menu.component';
import { GeneralStylesComponent } from './_editor/_elelment-options/general-styles/general-styles.component';
import { LayoutModule } from '@angular/cdk/layout';
import { WebsiteSettingsComponent } from './_editor/_settings/website-settings/website-settings.component';
import { ContainerComponent } from './_layout/widgets/container/container.component';
import { DragDropCdkComponent } from './_layout/widgets/container/drag-drop-cdk/drag-drop-cdk.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ContainersComponent } from './_layout/widgets/container/containers/containers.component';
import { ContainerChildComponent } from './_layout/widgets/container/container-child/container-child.component';
import { PageWidgetsComponent } from './_layout/widgets/page-widgets/page-widgets.component';
import { PageWidgetComponent } from './_layout/widgets/page-widget/page-widget.component';
import { PageWidgetTreeComponent } from './_layout/widgets/page-widget-tree/page-widget-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TextEditorComponent,
    DragableComponent,
    DrageDropDirective,
    LayoutComponent,
    NavBarComponent,
    PageViewerComponent,
    EditorComponent,
    DragDropComponent,
    SortableListDragDropComponent,
    ToolbarComponent,
    WidgetsComponent,
    SectionViewerComponent,
    CardsComponent,
    ElementStyleComponent,
    FlexElementComponent,
    CanDragMeDropDirective,
    CanDrogOnMeDirective,
    WidNavBarComponent,
    HtmlElementComponent,
    HoveMeDirective,
    ImagePickerComponent,
    HerosComponent,
    TextWidgetComponent,
    EditorDirective,
    ResponsiMadeEasyComponent,
    ResponsiveNavBarComponent,
    LandingPageComponent,
    UnitsComponent,
    ListComponent,
    RowComponent,
    MiniMenuComponent,
    ColumnComponent,
    ColumnWidgetComponent,
    CardComponent,
    MenusComponent,
    FormsComponent,
    InputComponent,
    PublicSectionComponent,
    PublicColumnComponent,
    PublicColumnWidgetComponent,
    PageSettingsComponent,
    PublicHtmlElementComponent,
    PublicMenuComponent,
    ElementToolsComponent,
    OptionsComponent,
    LayersComponent,
    OptionsInputComponent,
    PublicFormComponent,
    PublicInputComponent,
    SideMenuComponent,
    GeneralStylesComponent,
    WebsiteSettingsComponent,
    ContainerComponent,
    DragDropCdkComponent,
    ContainersComponent,
    ContainerChildComponent,
    PageWidgetsComponent,
    PageWidgetComponent,
    PageWidgetTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
