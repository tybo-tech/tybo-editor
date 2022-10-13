import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageViewerComponent } from './public/page-viewer/page-viewer.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { WorkspaceComponent } from './account/workspace/workspace.component';
import { HomeComponent } from './account/home/home.component';
import { CreateANewWebsiteComponent } from './account/create-a-new-website/create-a-new-website.component';
import { WebsiteBasicDetailsComponent } from './account/website-basic-details/website-basic-details.component';
import { StyleFillComponent } from './dock-style/dock-styles/style-components/style-fill/style-fill.component';
import { HomeActionsComponent } from './account/home/home-actions/home-actions.component';
import { AppComponent } from './app.component';
import { DockAddComponent } from './dock-style/dock-add/dock-add.component';
import { DockContainerPublicComponent } from './dock-style/dock-container-public/dock-container-public.component';
import { DockContainerComponent } from './dock-style/dock-container/dock-container.component';
import { DockLayersComponent } from './dock-style/dock-layers/dock-layers.component';
import { DockMenuComponent } from './dock-style/dock-menu/dock-menu.component';
import { DockPagePublicComponent } from './dock-style/dock-page-public/dock-page-public.component';
import { DockPageComponent } from './dock-style/dock-page/dock-page.component';
import { DockResizerComponent } from './dock-style/dock-resizer/dock-resizer.component';
import { DockStackComponent } from './dock-style/dock-stack/dock-stack.component';
import { DockStylesComponent } from './dock-style/dock-styles/dock-styles.component';
import { DockTyphComponent } from './dock-style/dock-styles/style-components/dock-typh/dock-typh.component';
import { StyleAlignComponent } from './dock-style/dock-styles/style-components/style-align/style-align.component';
import { StyleDockComponent } from './dock-style/dock-styles/style-components/style-dock/style-dock.component';
import { StylePositionComponent } from './dock-style/dock-styles/style-components/style-position/style-position.component';
import { StyleRotateAndCornersComponent } from './dock-style/dock-styles/style-components/style-rotate-and-corners/style-rotate-and-corners.component';
import { StyleSizeComponent } from './dock-style/dock-styles/style-components/style-size/style-size.component';
import { DockTagPublicComponent } from './dock-style/dock-tag-public/dock-tag-public.component';
import { DockTagResizerComponent } from './dock-style/dock-tag-resizer/dock-tag-resizer.component';
import { DockTagComponent } from './dock-style/dock-tag/dock-tag.component';
import { DragDropComponent } from './expamples/drag-drop/drag-drop.component';
import { DragableComponent } from './expamples/dragable/dragable.component';
import { FlexElementComponent } from './expamples/flex-element/flex-element.component';
import { ResponsiMadeEasyComponent } from './expamples/responsi-made-easy/responsi-made-easy.component';
import { SortableListDragDropComponent } from './expamples/sortable-list-drag-drop/sortable-list-drag-drop.component';
import { PublicColumnComponent } from './public/public-column/public-column.component';
import { CanDragMeDropDirective } from './_directives/can-drag-me-drirective';
import { CanDrogOnMeDirective } from './_directives/can-drop-on-me-directive';
import { DrageDropDirective } from './_directives/drag-drip-drirective';
import { EditorDirective } from './_directives/editor.directive';
import { HoveMeDirective } from './_directives/hover-me';
import { CssClassesComponent } from './_editor/editor/css-classes/css-classes.component';
import { EditorComponent } from './_editor/editor/editor.component';
import { PublicTagComponent } from './_editor/editor/tag/public-tag/public-tag.component';
import { TagMenuComponent } from './_editor/editor/tag/tag-menu/tag-menu.component';
import { TagV2Component } from './_editor/editor/tag/tag-v2/tag-v2.component';
import { TagComponent } from './_editor/editor/tag/tag.component';
import { CollectionsComponent } from './_editor/editor/_database/collections/collections.component';
import { DatabaseComponent } from './_editor/editor/_database/database/database.component';
import { FormColumnComponent } from './_editor/editor/_database/form-column/form-column.component';
import { EventInputsComponent } from './_editor/editor/_events/event-inputs/event-inputs.component';
import { EventComponent } from './_editor/editor/_events/event/event.component';
import { WidgetEventsComponent } from './_editor/editor/_events/widget-events/widget-events.component';
import { ListIconsComponent } from './_editor/list-icons/list-icons.component';
import { StringfilterPipe } from './_editor/stringfilter.pipe';
import { StylesEditorComponent } from './_editor/styles-editor/styles-editor.component';
import { TemplatesComponent } from './_editor/templates/templates.component';
import { BackgroundColorComponent } from './_editor/_elelment-options/element-class/background-color/background-color.component';
import { BorderComponent } from './_editor/_elelment-options/element-class/border/border.component';
import { EdgetsComponent } from './_editor/_elelment-options/element-class/edgets/edgets.component';
import { ElementClassBettaComponent } from './_editor/_elelment-options/element-class/element-class-betta/element-class-betta.component';
import { ElementClassComponent } from './_editor/_elelment-options/element-class/element-class.component';
import { GradientPickerComponent } from './_editor/_elelment-options/element-class/gradient-picker/gradient-picker.component';
import { ElementDataComponent } from './_editor/_elelment-options/element-data/element-data.component';
import { ElementStyleComponent } from './_editor/_elelment-options/element-style/element-style.component';
import { ElementToolsComponent } from './_editor/_elelment-options/element-tools/element-tools.component';
import { GeneralStylesComponent } from './_editor/_elelment-options/general-styles/general-styles.component';
import { LayersComponent } from './_editor/_elelment-options/layers/layers.component';
import { OptionsInputComponent } from './_editor/_elelment-options/options-input/options-input.component';
import { OptionsComponent } from './_editor/_elelment-options/options/options.component';
import { ImagesComponent } from './_editor/_settings/images/images.component';
import { PageSettingsComponent } from './_editor/_settings/page-settings/page-settings.component';
import { WebsiteSettingsComponent } from './_editor/_settings/website-settings/website-settings.component';
import { LoaderComponent } from './_editors/loader/loader.component';
import { TextEditorComponent } from './_editors/text-editor/text-editor.component';
import { TextWidgetComponent } from './_editors/text-widget/text-widget.component';
import { ImagePickerComponent } from './_images/image-picker/image-picker.component';
import { LandingPageComponent } from './_layout/hero/landing-page/landing-page.component';
import { HtmlElementComponent } from './_layout/html-element/html-element.component';
import { PublicHtmlElementComponent } from './_layout/html-element/public-html-element/public-html-element.component';
import { NavBarComponent } from './_layout/nav-bar/nav-bar.component';
import { ResponsiveNavBarComponent } from './_layout/responsive-nav-bar/responsive-nav-bar.component';
import { ToolbarComponent } from './_layout/toolbar/toolbar.component';
import { UnitsComponent } from './_layout/units/units.component';
import { PagePublicTreeComponent } from './_layout/widgets/page-public-tree/page-public-tree.component';
import { ContainerMenuComponent } from './_layout/widgets/page-widget-tree/container-menu/container-menu.component';
import { PageWidgetTreeComponent } from './_layout/widgets/page-widget-tree/page-widget-tree.component';
import { PageWidgetComponent } from './_layout/widgets/page-widget/page-widget.component';
import { PageWidgetsComponent } from './_layout/widgets/page-widgets/page-widgets.component';
import { PageWidgtesNavigationTreeComponent } from './_layout/widgets/page-widgtes-navigation-tree/page-widgtes-navigation-tree.component';
import { WidNavBarComponent } from './_layout/widgets/wid-nav-bar/wid-nav-bar.component';
import { WidgetsComponent } from './_layout/widgets/widgets.component';
import { MacroBackgroundComponent } from './_macro-styles/macro-background/macro-background.component';
import { MacroMarginComponent } from './_macro-styles/macro-margin/macro-margin.component';
import { MacroTipographyComponent } from './_macro-styles/macro-tipography/macro-tipography.component';
import { MicroBorderComponent } from './_macro-styles/micro-border/micro-border.component';
import { MicroCornersComponent } from './_macro-styles/micro-corners/micro-corners.component';
import { MicroDisplayComponent } from './_macro-styles/micro-display/micro-display.component';
import { MicroLayoutComponent } from './_macro-styles/micro-layout/micro-layout.component';
import { MicroPaddingComponent } from './_macro-styles/micro-padding/micro-padding.component';
import { MicroPositionComponent } from './_macro-styles/micro-position/micro-position.component';
import { MicroSizeComponent } from './_macro-styles/micro-size/micro-size.component';
import { NastedWidgetComponent } from './_recursive/nasted-widget/nasted-widget.component';

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

export const declarations = [
  AppComponent,
    TextEditorComponent,
    DragableComponent,
    DrageDropDirective,
    NavBarComponent,
    PageViewerComponent,
    EditorComponent,
    DragDropComponent,
    SortableListDragDropComponent,
    ToolbarComponent,
    WidgetsComponent,
    ElementStyleComponent,
    FlexElementComponent,
    CanDragMeDropDirective,
    CanDrogOnMeDirective,
    WidNavBarComponent,
    HtmlElementComponent,
    HoveMeDirective,
    ImagePickerComponent,
    TextWidgetComponent,
    EditorDirective,
    ResponsiMadeEasyComponent,
    ResponsiveNavBarComponent,
    LandingPageComponent,
    UnitsComponent,
    PublicColumnComponent,
    PageSettingsComponent,
    PublicHtmlElementComponent,
    ElementToolsComponent,
    OptionsComponent,
    LayersComponent,
    OptionsInputComponent,
    GeneralStylesComponent,
    WebsiteSettingsComponent,
    PageWidgetsComponent,
    PageWidgetComponent,
    PageWidgetTreeComponent,
    PageWidgtesNavigationTreeComponent,
    PagePublicTreeComponent,
    ElementClassComponent,
    StylesEditorComponent,
    LoginComponent,
    RegisterComponent,
    WorkspaceComponent,
    HomeComponent,
    CreateANewWebsiteComponent,
    WebsiteBasicDetailsComponent,
    DatabaseComponent,
    CssClassesComponent,
    CollectionsComponent,
    FormColumnComponent,
    ListIconsComponent,
    StringfilterPipe,
    ElementDataComponent,
    NastedWidgetComponent,
    LoaderComponent,
    BackgroundColorComponent,
    GradientPickerComponent,
    EdgetsComponent,
    BorderComponent,
    TagComponent,
    ElementClassBettaComponent,
    MacroBackgroundComponent,
    MacroTipographyComponent,
    MicroCornersComponent,
    MicroBorderComponent,
    MicroLayoutComponent,
    MicroPaddingComponent,
    ImagesComponent,
    PublicTagComponent,
    ContainerMenuComponent,
    MacroMarginComponent,
    TagMenuComponent,
    TemplatesComponent,
    WidgetEventsComponent,
    TagV2Component,
    MicroSizeComponent,
    EventComponent,
    MicroDisplayComponent,
    EventInputsComponent,
    MicroPositionComponent,
    HomeActionsComponent,
    DockContainerComponent,
    DockMenuComponent,
    DockAddComponent,
    DockStylesComponent,
    DockLayersComponent,
    DockPageComponent,
    DockTagComponent,
    StyleAlignComponent,
    StyleSizeComponent,
    StylePositionComponent,
    StyleRotateAndCornersComponent,
    StyleFillComponent,
    StyleDockComponent,
    DockResizerComponent,
    DockTagResizerComponent,
    DockTyphComponent,
    DockStackComponent,
    DockContainerPublicComponent,
    DockPagePublicComponent,
    DockTagPublicComponent
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
