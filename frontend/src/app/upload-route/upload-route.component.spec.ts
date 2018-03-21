import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRouteComponent } from './upload-route.component';

describe('UploadRouteComponent', () => {
  let component: UploadRouteComponent;
  let fixture: ComponentFixture<UploadRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
