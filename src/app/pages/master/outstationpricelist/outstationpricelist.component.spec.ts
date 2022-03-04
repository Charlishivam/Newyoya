import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstationpricelistComponent } from './outstationpricelist.component';

describe('OutstationpricelistComponent', () => {
  let component: OutstationpricelistComponent;
  let fixture: ComponentFixture<OutstationpricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstationpricelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstationpricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
