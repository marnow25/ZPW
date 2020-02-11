import { TripMaxPricePipe } from './trip-max-price.pipe';
import { Trip } from 'src/app/models/trip'

describe('TripMaxPricePipe', () => {
  it('create an instance', () => {
    const pipe = new TripMaxPricePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' } as Trip;
    const trips = [];
    trips.push(trip);
    const pipe = new TripMaxPricePipe();
    pipe.transform(trips, 3000);
    expect(pipe).toBeTruthy();
  }); 
});
