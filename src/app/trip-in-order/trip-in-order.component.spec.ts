import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInOrderComponent } from './trip-in-order.component';

describe('TripInOrderComponent', () => {
  let component: TripInOrderComponent;
  let fixture: ComponentFixture<TripInOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripInOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
