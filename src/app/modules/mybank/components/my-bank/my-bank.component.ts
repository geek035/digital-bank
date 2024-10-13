import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bank',
  templateUrl: './my-bank.component.html',
  styleUrls: ['./my-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyBankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
