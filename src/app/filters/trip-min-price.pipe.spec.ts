import { TripMinPricePipe } from './trip-min-price.pipe';
import { Trip } from 'src/app/models/trip'

describe('TripMinPricePipe', () => {
  it('create an instance', () => {
    const pipe = new TripMinPricePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' } as Trip;
    const trips = [];
    trips.push(trip);
    const pipe = new TripMinPricePipe();
    pipe.transform(trips, 1000);
    expect(pipe).toBeTruthy();
  }); 
});
