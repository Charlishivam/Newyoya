import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalpackageviewComponent } from './rentalpackageview.component';

describe('RentalpackageviewComponent', () => {
  let component: RentalpackageviewComponent;
  let fixture: ComponentFixture<RentalpackageviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalpackageviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalpackageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
