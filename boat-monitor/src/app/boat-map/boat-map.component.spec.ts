import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatMapComponent } from './boat-map.component';

describe('BoatMapComponent', () => {
  let component: BoatMapComponent;
  let fixture: ComponentFixture<BoatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
