import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShowcaseService } from 'src/app/core/services/showcase-service/showcase.service';
import { IProductModel } from 'src/app/interfaces/mybank/product-model.interface';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountRegisterComponent implements OnInit {
  constructor(
    private readonly _showcaseService: ShowcaseService,
    private readonly _router: Router,
  ) {}

  public showSpinner$ = new BehaviorSubject(false);
  public currentAccount$!: Observable<IProductModel>;
  public savingsAccount$!: Observable<IProductModel>;

  ngOnInit(): void {
    this.currentAccount$ = this.getProductInfo(1);
    this.savingsAccount$ = this.getProductInfo(2);
  }

  onRedirectClick(event: Event) {
    const dataInfo = (event.currentTarget as HTMLElement).dataset?.['btn'];

    if (dataInfo == 'current') {
      this._router.navigate(['/user-home/account-register-operation'], {
        queryParams: { accountType: dataInfo },
      });
    } else {
      this._router.navigate(['/user-home/account-register-operation'], {
        queryParams: { accountType: dataInfo },
      });
    }
  }

  private getProductInfo(productId: number): Observable<IProductModel> {
    return this._showcaseService.getProductInfo(productId);
  }
}
