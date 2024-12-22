import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTaskPage } from './agregar-task.page';

describe('AgregarTaskPage', () => {
  let component: AgregarTaskPage;
  let fixture: ComponentFixture<AgregarTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
