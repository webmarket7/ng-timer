import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePopupComponent } from './side-popup.component';

describe('SidePopupComponent', () => {
  let component: SidePopupComponent;
  let fixture: ComponentFixture<SidePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
