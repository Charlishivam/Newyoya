import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalpriceComponent } from './normalprice.component';

describe('NormalpriceComponent', () => {
  let component: NormalpriceComponent;
  let fixture: ComponentFixture<NormalpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalpriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
