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

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];
    
    switch (dataInfo) {
      case 'enter':
        this._router.navigate(['/logging']);
        break;

      case 'register':
        this._router.navigate(['/registration']);
        break;
    }
  }
}
