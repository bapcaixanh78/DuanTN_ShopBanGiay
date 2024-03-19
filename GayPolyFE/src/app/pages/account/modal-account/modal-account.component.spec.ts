import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccountComponent } from './modal-account.component';

describe('ModalAccountComponent', () => {
  let component: ModalAccountComponent;
  let fixture: ComponentFixture<ModalAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
