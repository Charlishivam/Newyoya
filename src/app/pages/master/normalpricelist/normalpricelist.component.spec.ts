import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalpricelistComponent } from './normalpricelist.component';

describe('NormalpricelistComponent', () => {
  let component: NormalpricelistComponent;
  let fixture: ComponentFixture<NormalpricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalpricelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalpricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
