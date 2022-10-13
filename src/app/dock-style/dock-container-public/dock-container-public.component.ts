import { Component, HostListener, OnInit } from '@angular/core';
import { PageModel } from 'src/app/_classes/PageModel';
import { WebsiteModel } from 'src/app/_classes/WebsiteModel';
import { EventService } from 'src/app/_services/event.service';
import { SyncService } from 'src/app/_services/sync.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-dock-container-public',
  templateUrl: './dock-container-public.component.html',
  styleUrls: ['./dock-container-public.component.scss']
})
export class DockContainerPublicComponent implements OnInit {
  website: WebsiteModel;
  page: PageModel;
  savingStyles: boolean;
  constructor(private websiteService: WebsiteService, private syncService: SyncService, private eventService: EventService) { }

  ngOnInit(): void {
    this.websiteService.websiteObservable.subscribe(data => {
      if (data) {
        this.website = data;
      }
    });

    this.websiteService.pageObservable.subscribe(data => {
      if (data) {
        this.page = data;
      }
    });
    this.syncWidgets();
  }

  
  syncWidgets() {
    let timeer = setInterval(() => {
      // auto update styles
      const styles = this.syncService.getStylsToSave;
      if (styles && styles.length) {
        const temp = styles;
        this.savingStyles = true;
        this.syncService.empyStyles();
        this.websiteService.create(`webstyles/save-webstyles.php`, styles).subscribe(data => {
          this.savingStyles = false;

        });
      }

      // auto update widget
      const widgets = this.syncService.getWidgetsToSave;
      if (widgets && widgets.length) {
        const temp = widgets;
        this.savingStyles = true;
        this.syncService.empyWidgets();
        this.websiteService.saveWidgetChanges(widgets[0])
      }
    }, 2000);
  }

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    if (event.key == "Shift") {
      this.eventService.updateKeyEventState("Shift")
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "Shift") {
      this.eventService.updateKeyEventState("")
    }
  }

}
