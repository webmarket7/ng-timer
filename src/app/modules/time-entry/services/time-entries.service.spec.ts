import { TestBed, inject } from '@angular/core/testing';

import { TimeEntriesService } from './time-entries.service';

describe('TimeEntriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeEntriesService]
    });
  });

  it('should be created', inject([TimeEntriesService], (service: TimeEntriesService) => {
    expect(service).toBeTruthy();
  }));
});
