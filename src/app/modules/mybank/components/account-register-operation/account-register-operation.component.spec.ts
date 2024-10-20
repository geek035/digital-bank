import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterOperationComponent } from './account-register-operation.component';

describe('AccountRegisterOperationComponent', () => {
  let component: AccountRegisterOperationComponent;
  let fixture: ComponentFixture<AccountRegisterOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRegisterOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
