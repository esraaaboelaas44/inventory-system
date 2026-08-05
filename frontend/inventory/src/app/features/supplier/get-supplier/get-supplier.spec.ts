import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSupplier } from './get-supplier';

describe('GetSupplier', () => {
  let component: GetSupplier;
  let fixture: ComponentFixture<GetSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSupplier],
    }).compileComponents();

    fixture = TestBed.createComponent(GetSupplier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
