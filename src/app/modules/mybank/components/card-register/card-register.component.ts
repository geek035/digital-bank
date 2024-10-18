import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-register',
  templateUrl: './card-register.component.html',
  styleUrls: ['./card-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
