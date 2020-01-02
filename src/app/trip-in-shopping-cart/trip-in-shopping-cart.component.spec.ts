import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInShoppingCartComponent } from './trip-in-shopping-cart.component';

describe('TripInShoppingCartComponent', () => {
  let component: TripInShoppingCartComponent;
  let fixture: ComponentFixture<TripInShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripInShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
