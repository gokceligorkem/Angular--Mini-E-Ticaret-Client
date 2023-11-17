import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercompleteComponent } from './ordercomplete.component';

describe('OrdercompleteComponent', () => {
  let component: OrdercompleteComponent;
  let fixture: ComponentFixture<OrdercompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdercompleteComponent]
    });
    fixture = TestBed.createComponent(OrdercompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
