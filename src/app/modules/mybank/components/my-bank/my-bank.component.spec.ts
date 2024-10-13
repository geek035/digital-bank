import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBankComponent } from './my-bank.component';

describe('MyBankComponent', () => {
  let component: MyBankComponent;
  let fixture: ComponentFixture<MyBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
