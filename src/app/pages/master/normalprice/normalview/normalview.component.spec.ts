import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalviewComponent } from './normalview.component';

describe('NormalviewComponent', () => {
  let component: NormalviewComponent;
  let fixture: ComponentFixture<NormalviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
