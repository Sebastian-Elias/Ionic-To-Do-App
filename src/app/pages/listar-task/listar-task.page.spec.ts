import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarTaskPage } from './listar-task.page';

describe('ListarTaskPage', () => {
  let component: ListarTaskPage;
  let fixture: ComponentFixture<ListarTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
