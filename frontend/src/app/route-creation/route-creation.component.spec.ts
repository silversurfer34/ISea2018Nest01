import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreationComponent } from './route-creation.component';

describe('RouteCreationComponent', () => {
  let component: RouteCreationComponent;
  let fixture: ComponentFixture<RouteCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
