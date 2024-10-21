import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-refill-operation',
  templateUrl: './refill-operation.component.html',
  styleUrls: ['./refill-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefillOperationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
