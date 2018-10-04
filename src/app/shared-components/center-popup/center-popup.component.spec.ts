import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPopupComponent } from './center-popup.component';

describe('CenterPopupComponent', () => {
  let component: CenterPopupComponent;
  let fixture: ComponentFixture<CenterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
