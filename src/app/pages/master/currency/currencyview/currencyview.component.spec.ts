import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyviewComponent } from './currencyview.component';

describe('CurrencyviewComponent', () => {
  let component: CurrencyviewComponent;
  let fixture: ComponentFixture<CurrencyviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
