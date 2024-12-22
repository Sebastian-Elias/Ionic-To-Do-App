import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './listar-task.page.html',
  styleUrls: ['./listar-task.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
  standalone: true
})
export class ListarTaskPage implements OnInit {
  tasks: { id: string; title: string; description: string; photo: string | null; location: { lat: number; lng: number } | null }[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a tasks$ para obtener la lista actualizada de tareas
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  
    // Cargar las tareas al inicio, en caso de que no estén disponibles en el BehaviorSubject
    this.loadTasks();
  }

  // Método para cargar las tareas desde el servicio
  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;  // Asignar las tareas obtenidas de la API
    });
  }

  // Cargar tareas cuando se vuelve a la vista
  ionViewWillEnter() {
    this.loadTasks(); // Recargar las tareas al volver a la página
  }

  // Método para navegar a la página de crear tarea
  navigateToCreateTask() {
    this.router.navigate(['/agregar-task']);
  }

   // Método para navegar a la página de editar tarea
   navigateToEditTask(taskId: string) {
    this.router.navigate([`/editar-task/${taskId}`]); // Navegar a la página de edición con el ID de la tarea
  }

 // Método para navegar a la página de eliminar tarea
  navigateToDeleteTask(taskId: string) {
    this.router.navigate([`/eliminar-task/${taskId}`]);
  }
}