import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagetranslationlistComponent } from './languagetranslationlist.component';

describe('LanguagetranslationlistComponent', () => {
  let component: LanguagetranslationlistComponent;
  let fixture: ComponentFixture<LanguagetranslationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguagetranslationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagetranslationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
