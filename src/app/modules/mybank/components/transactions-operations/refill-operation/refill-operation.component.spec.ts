import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillOperationComponent } from './refill-operation.component';

describe('RefillOperationComponent', () => {
  let component: RefillOperationComponent;
  let fixture: ComponentFixture<RefillOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefillOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
