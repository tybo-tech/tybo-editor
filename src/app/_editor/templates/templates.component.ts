import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Choose your favourite webiste templates");
  }

}
