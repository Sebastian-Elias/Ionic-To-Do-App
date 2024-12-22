import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarTaskPage } from './eliminar-task.page';

describe('EliminarTaskPage', () => {
  let component: EliminarTaskPage;
  let fixture: ComponentFixture<EliminarTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
