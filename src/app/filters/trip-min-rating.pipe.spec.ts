import { TripMinRatingPipe } from './trip-min-rating.pipe';
import { Trip } from 'src/app/models/trip'

describe('TripMinRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new TripMinRatingPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' } as Trip;
    const trips = [];
    trips.push(trip);
    const pipe = new TripMinRatingPipe();
    pipe.transform(trips, 1);
    expect(pipe).toBeTruthy();
  }); 
});
