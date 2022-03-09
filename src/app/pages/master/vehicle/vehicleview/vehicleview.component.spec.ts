import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleviewComponent } from './vehicleview.component';

describe('VehicleviewComponent', () => {
  let component: VehicleviewComponent;
  let fixture: ComponentFixture<VehicleviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
