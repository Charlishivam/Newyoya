import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushnotificationlistComponent } from './pushnotificationlist.component';

describe('PushnotificationlistComponent', () => {
  let component: PushnotificationlistComponent;
  let fixture: ComponentFixture<PushnotificationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushnotificationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushnotificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
