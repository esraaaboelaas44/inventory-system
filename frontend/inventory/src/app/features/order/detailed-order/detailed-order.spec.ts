import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedOrder } from './detailed-order';

describe('DetailedOrder', () => {
  let component: DetailedOrder;
  let fixture: ComponentFixture<DetailedOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
