import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeEntryEffects } from './time-entry.effects';

describe('TimeEntryService', () => {
  let actions$: Observable<any>;
  let effects: TimeEntryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeEntryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimeEntryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
