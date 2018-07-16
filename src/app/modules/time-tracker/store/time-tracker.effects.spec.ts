import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeTrackerEffects } from './time-tracker.effects';

describe('TimeTrackerService', () => {
  let actions$: Observable<any>;
  let effects: TimeTrackerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeTrackerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimeTrackerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
