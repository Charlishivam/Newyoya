import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalpackagelistComponent } from './rentalpackagelist.component';

describe('RentalpackagelistComponent', () => {
  let component: RentalpackagelistComponent;
  let fixture: ComponentFixture<RentalpackagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalpackagelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalpackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
