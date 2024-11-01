import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrendasComponent } from './add-prendas.component';

describe('AddPrendasComponent', () => {
  let component: AddPrendasComponent;
  let fixture: ComponentFixture<AddPrendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPrendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
