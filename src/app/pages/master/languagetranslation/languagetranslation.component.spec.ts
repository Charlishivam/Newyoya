import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagetranslationComponent } from './languagetranslation.component';

describe('LanguagetranslationComponent', () => {
  let component: LanguagetranslationComponent;
  let fixture: ComponentFixture<LanguagetranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagetranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagetranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
