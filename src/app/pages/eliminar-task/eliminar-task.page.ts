import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-eliminar-task',
  templateUrl: './eliminar-task.page.html',
  styleUrls: ['./eliminar-task.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class EliminarTaskPage {

  taskId!: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtener el ID de la tarea desde los parámetros de la ruta
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
  }

  eliminarTarea() {
    if (this.taskId) {
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => {
          alert('Tarea eliminada con éxito');
          // Si la tarea se elimina correctamente, redirigir a la lista de tareas y actualizarla
          this.router.navigate(['/listar-task']).then(() => {
            // Recargar la lista de tareas después de la navegación
            this.router.navigateByUrl('/listar-task', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/listar-task']);
            });
          });
        },
        error: (err) => {
          console.error('Error al eliminar la tarea:', err);
          alert('Ocurrió un error al eliminar la tarea');
        }
      });
    } else {
      alert('No se encontró el ID de la tarea');
    }
  }
}
