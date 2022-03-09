import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstationviewComponent } from './outstationview.component';

describe('OutstationviewComponent', () => {
  let component: OutstationviewComponent;
  let fixture: ComponentFixture<OutstationviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstationviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstationviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
