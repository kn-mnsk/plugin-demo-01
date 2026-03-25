import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Callout } from './callout';

describe('Callout', () => {
  let component: Callout;
  let fixture: ComponentFixture<Callout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Callout],
    }).compileComponents();

    fixture = TestBed.createComponent(Callout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
