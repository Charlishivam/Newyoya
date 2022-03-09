import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxviewComponent } from './taxview.component';

describe('TaxviewComponent', () => {
  let component: TaxviewComponent;
  let fixture: ComponentFixture<TaxviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
