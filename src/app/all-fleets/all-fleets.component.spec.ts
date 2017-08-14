import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFleetsComponent } from './all-fleets.component';

describe('AllFleetsComponent', () => {
  let component: AllFleetsComponent;
  let fixture: ComponentFixture<AllFleetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFleetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFleetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
