import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTaskPage } from './editar-task.page';

describe('EditarTaskPage', () => {
  let component: EditarTaskPage;
  let fixture: ComponentFixture<EditarTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
