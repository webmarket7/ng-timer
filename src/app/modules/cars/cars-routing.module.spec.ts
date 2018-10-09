import { CarsRoutingModule } from './cars-routing.module';

describe('CarsRoutingModule', () => {
  let carsRoutingModule: CarsRoutingModule;

  beforeEach(() => {
    carsRoutingModule = new CarsRoutingModule();
  });

  it('should create an instance', () => {
    expect(carsRoutingModule).toBeTruthy();
  });
});
