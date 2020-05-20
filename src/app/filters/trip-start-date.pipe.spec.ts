import { TripStartDatePipe } from './trip-start-date.pipe';
import { Trip } from 'src/app/models/trip';

describe('TripStartDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TripStartDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    let trip = { id: '1', rating: 2, name: 'Kraków Apartment', destination: 'Kraków', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Kraków Apartment', imageSrc: '/img/poland.jpg' } as Trip;
    const trips = [];
    trips.push(trip);
    const pipe = new TripStartDatePipe();
    pipe.transform(trips, 'startDate');
    expect(pipe).toBeTruthy();
  }); 
});
