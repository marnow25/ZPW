import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInShoppingCartComponent } from './trip-in-shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Trip } from 'src/app/models/trip';
import 'zone.js/dist/zone-testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';



describe('TripInShoppingCartComponent', () => {
  let component: TripInShoppingCartComponent;
  let fixture: ComponentFixture<TripInShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, HttpClientModule, RouterTestingModule],
      declarations: [ TripInShoppingCartComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripInShoppingCartComponent);
    component = fixture.componentInstance;
    component.trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg'} as Trip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
