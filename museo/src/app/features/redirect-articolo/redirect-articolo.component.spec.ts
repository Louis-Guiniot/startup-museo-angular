import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectArticoloComponent } from './redirect-articolo.component';

describe('RedirectArticoloComponent', () => {
  let component: RedirectArticoloComponent;
  let fixture: ComponentFixture<RedirectArticoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectArticoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
