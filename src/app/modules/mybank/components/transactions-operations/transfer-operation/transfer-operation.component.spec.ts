import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOperationComponent } from './transfer-operation.component';

describe('TransferOperationComponent', () => {
  let component: TransferOperationComponent;
  let fixture: ComponentFixture<TransferOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
