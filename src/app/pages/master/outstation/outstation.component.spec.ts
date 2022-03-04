import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstationComponent } from './outstation.component';

describe('OutstationComponent', () => {
  let component: OutstationComponent;
  let fixture: ComponentFixture<OutstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
