import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentaryComponent } from './commentary.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule} from '@angular/router/testing';
import { Trip } from 'src/app/models/trip';
import { Comment } from 'src/app/models/comment';
import { TripService } from 'src/app/services/trip.service';
import { Observable, of } from 'rxjs';
import 'zone.js/dist/zone-testing'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';



class MockItemService {
  comments = [];

  getComments(id: number): Observable<string[]>{
    return of(['ss']);
  }
  getOrderedTrips(id: number): Observable<string[]>{
    return of(['ss']);
  }

  addComment(comment: String) {
    return this.comments.push(comment);
  }

  countComments(): number{
    return this.comments.length;
  }
}


describe('CommentComponent', () => {
  let component: CommentaryComponent;
  let itemService: MockItemService;
  let fixture: ComponentFixture<CommentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, HttpClientModule, RouterTestingModule],
      providers: [
        {provide: TripService, useClass: MockItemService}
      ],
      declarations: [ CommentaryComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryComponent);
    component = fixture.componentInstance;

    itemService = TestBed.get(TripService);

    component.trip = {id: '22323'} as Trip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new comment', () => {
      component.comment = 'New comment';
      component.addComment();
      var count = itemService.countComments();
      expect(count).toEqual(1);
  });

  it('should not add a new empty comment', () => {
      component.comment = '';
      component.addComment();
      var count = itemService.countComments();
      expect(count).toEqual(0);
  });
});