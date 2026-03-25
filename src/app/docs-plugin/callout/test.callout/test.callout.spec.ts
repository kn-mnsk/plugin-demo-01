import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCallout } from './test.callout';

describe('TestCallout', () => {
  let component: TestCallout;
  let fixture: ComponentFixture<TestCallout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCallout],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCallout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
