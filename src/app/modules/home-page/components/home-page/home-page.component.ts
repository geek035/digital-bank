import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public title = 'Дебетовая карта от К-Банка';
  constructor(
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  onRedirectClick() {
    this._router.navigate(['/logging']);
  }
}
