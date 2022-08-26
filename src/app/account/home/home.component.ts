import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Emitters } from 'src/app/_emmiters/Emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean
  constructor(
    private title: Title,
    private meta: Meta,
  ) { }

  ngOnInit(): void {
   this.title.setTitle("Tybo | Build fully responsive websites without touching code.");
   this.meta.updateTag({name: 'home', content: '...'})
  }

}
