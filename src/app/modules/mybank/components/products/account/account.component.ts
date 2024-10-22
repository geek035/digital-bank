import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { IAccountModel } from 'src/app/interfaces/mybank/account-model.interace';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  @Input() account!: IAccountModel;
}
