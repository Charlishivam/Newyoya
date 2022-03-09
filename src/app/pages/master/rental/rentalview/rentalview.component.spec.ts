import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalviewComponent } from './rentalview.component';

describe('RentalviewComponent', () => {
  let component: RentalviewComponent;
  let fixture: ComponentFixture<RentalviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
