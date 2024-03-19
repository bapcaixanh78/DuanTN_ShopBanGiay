import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalvoucherComponent } from './modalvoucher.component';

describe('ModalvoucherComponent', () => {
  let component: ModalvoucherComponent;
  let fixture: ComponentFixture<ModalvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
