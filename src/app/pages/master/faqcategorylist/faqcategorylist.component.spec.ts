import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqcategorylistComponent } from './faqcategorylist.component';

describe('FaqcategorylistComponent', () => {
  let component: FaqcategorylistComponent;
  let fixture: ComponentFixture<FaqcategorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqcategorylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
