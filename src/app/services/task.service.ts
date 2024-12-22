import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  //URL base de la API
  private apiUrl = 'https://6764634552b2a7619f5c6ccb.mockapi.io/api/v1/task';

  // BehaviorSubject que mantendrá la lista de tareas actualizada
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.getTasks();
  }

  // Método para obtener todas las tareas
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para crear una nueva tarea
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task).pipe(
      tap(() => {
        // Obtener las tareas actuales y añadir la nueva tarea
        this.getTasks().subscribe((data) => {
          this.tasksSubject.next(data);  // Actualizamos el BehaviorSubject con la nueva lista
        });
      })
    );
  }
  
// Método para actualizar una tarea
updateTask(taskId: string, updatedTask: Task): Observable<Task> {
  return this.http.put<Task>(`${this.apiUrl}/${taskId}`, updatedTask).pipe(
    tap((response) => {
      const currentTasks = this.tasksSubject.value;
      const taskIndex = currentTasks.findIndex(task => task.id === taskId);

      if (taskIndex > -1) {
        currentTasks[taskIndex] = response; // Reemplaza la tarea actualizada
        this.tasksSubject.next([...currentTasks]); // Actualiza el BehaviorSubject
      }
    })
  );
}

  // Método para eliminar una tarea
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      // Actualizar la lista de tareas en el BehaviorSubject
      tap(() => {
        const updatedTasks = this.tasksSubject.value.filter(task => task.id !== id);
        this.tasksSubject.next(updatedTasks);
      })
    );
  }
}
