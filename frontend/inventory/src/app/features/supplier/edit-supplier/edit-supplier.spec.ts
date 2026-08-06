import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplier } from './edit-supplier';

describe('EditSupplier', () => {
  let component: EditSupplier;
  let fixture: ComponentFixture<EditSupplier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupplier],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSupplier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
