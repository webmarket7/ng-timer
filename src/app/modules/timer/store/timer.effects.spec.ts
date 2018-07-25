import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimerEffects } from './timer.effects';

describe('TimerService', () => {
  let actions$: Observable<any>;
  let effects: TimerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
