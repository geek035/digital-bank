import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRegisterOperationComponent } from './card-register-operation.component';

describe('CardRegisterOperationComponent', () => {
  let component: CardRegisterOperationComponent;
  let fixture: ComponentFixture<CardRegisterOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRegisterOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRegisterOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
