import { Trip } from '../models/trip'

export const TRIPS: Trip[] = [
    { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg'},
    { id: '2', rating: 4, name: 'China Trip', destination: 'China', startDate: new Date('11/23/2019'), endDate: new Date('12/10/2019'), limit: 20, price: 6000, description: 'China Trip', imageSrc: '/img/china.jpg'},
    { id: '3', rating: 4, name: 'Japan Trip', destination: 'Japan', startDate: new Date('12/15/2019'), endDate: new Date('12/30/2019'), limit: 15, price: 6500, description: 'Japan Trip', imageSrc: '/img/japan.jpg'},
    { id: '4', rating: 1, name: 'Norway Trip', destination: 'Norway', startDate: new Date('11/25/2019'), endDate: new Date('12/5/2019'), limit: 30, price: 2500, description: 'Norway Trip', imageSrc: '/img/norway.jpg'},
    { id: '5', rating: 0, name: 'Russia Trip', destination: 'Russia', startDate: new Date('12/6/2019'), endDate: new Date('12/16/2019'), limit: 45, price: 3500, description: 'Russia Trip', imageSrc: '/img/russia.jpg'},
    { id: '6', rating: 5, name: 'Switzerland Trip', destination: 'Switzerland', startDate: new Date('12/3/2019'), endDate: new Date('12/15/2019'), limit: 28, price: 3000, description: 'Switzerland Trip', imageSrc: '/img/switzerland.jpg'},
    { id: '7', rating: 3, name: 'Italy Trip', destination: 'Italy', startDate: new Date('12/7/2019'), endDate: new Date('12/23/2019'), limit: 25, price: 3750, description: 'Italy Trip', imageSrc: '/img/italy.jpg'},
    { id: '8', rating: 5, name: 'Greece Trip', destination: 'Greece', startDate: new Date('12/7/2019'), endDate: new Date('12/14/2019'), limit: 48, price: 3250, description: 'Greece Trip', imageSrc: '/img/greece.jpg'},
  ];