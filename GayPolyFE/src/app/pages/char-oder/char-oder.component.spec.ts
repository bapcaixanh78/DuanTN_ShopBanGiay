import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharOderComponent } from './char-oder.component';

describe('CharOderComponent', () => {
  let component: CharOderComponent;
  let fixture: ComponentFixture<CharOderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharOderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
