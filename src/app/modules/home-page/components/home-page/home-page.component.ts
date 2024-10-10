import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fadeInOut } from 'src/app/animations/_fade';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    fadeInOut
  ]
})
export class HomePageComponent implements OnInit {
  public title = 'Дебетовая карта от К-Банка';
  constructor() { }

  ngOnInit(): void {
    
  }
}
