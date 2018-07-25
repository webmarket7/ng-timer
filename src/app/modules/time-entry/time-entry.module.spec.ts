import { TimeEntryModule } from './time-entry.module';

describe('TimeEntryModule', () => {
  let timeEntryModule: TimeEntryModule;

  beforeEach(() => {
    timeEntryModule = new TimeEntryModule();
  });

  it('should create an instance', () => {
    expect(timeEntryModule).toBeTruthy();
  });
});
