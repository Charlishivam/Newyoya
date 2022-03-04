import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalpackageComponent } from './rentalpackage.component';

describe('RentalpackageComponent', () => {
  let component: RentalpackageComponent;
  let fixture: ComponentFixture<RentalpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalpackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
