import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// Definimos la interfaz Task
interface Task {
  id: string; // Aquí definimos que la propiedad id existe en Task
  title: string;
  description: string;
  photo: string | null;
  location: { lat: 0, lng: 0 }
}

@Component({
  selector: 'app-editar-task',
  templateUrl: './editar-task.page.html',
  styleUrls: ['./editar-task.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class EditarTaskPage implements OnInit {
  taskId: string = '';
  task: any = { title: '', description: '', photo: null, location: null };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router 
  ) {}

  ngOnInit() {
    // Obtener el ID de la tarea desde los parámetros de la ruta
    this.taskId = this.route.snapshot.paramMap.get('id') || '';

    // Cargar los detalles de la tarea a editar
    if (this.taskId) {
      this.taskService.getTasks().subscribe((tasks: Task[]) => {
        const foundTask = tasks.find((t: Task) => t.id === this.taskId);
        if (foundTask) {
          this.task = foundTask;

          // Inicializar ubicación si no existe
          if (!this.task.location) {
            this.task.location = { lat: 0, lng: 0 }; // Valores predeterminados
          }
        }
      });
    }
  }

 // Obtener la ubicación actual del usuario si no existe
 async getCurrentLocation() {
  if (this.task.location && this.task.location.lat && this.task.location.lng) {
    // Si ya hay una ubicación registrada, no hacemos nada
    console.log('Ubicación ya registrada:', this.task.location);
    return;
  }

  try {
    const position = await Geolocation.getCurrentPosition();
    this.task.location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  } catch (e) {
    console.error('Error al obtener la ubicación:', e);
  }
}

  // Método para guardar los cambios en la tarea
  onSubmit() {
    if (this.task.title && this.task.description) {
      // Llamada al servicio para actualizar la tarea
      this.taskService.updateTask(this.taskId, this.task).subscribe(
        (response) => {
          console.log('Tarea actualizada con éxito:', response);
          // Redirigir a la lista de tareas después de actualizar
          this.router.navigate(['/listar-task']);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }

  // Método para tomar una foto con la cámara
async takePhoto() {
  try {
    const photo = await Camera.getPhoto({
      quality: 90, // Calidad de la foto
      allowEditing: false, // No permitir edición
      resultType: CameraResultType.Base64, // Almacenar la imagen en formato Base64
      source: CameraSource.Camera, // Usar la cámara
    });

    if (photo.base64String) {
      this.task.photo = photo.base64String; // Asignar la foto como base64 a la propiedad 'photo'
      console.log('Foto tomada:', this.task.photo);
    }
  } catch (error) {
    console.error('Error al tomar la foto', error);
  }
}


  // Método para manejar la selección de una foto
  /*onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file).then((base64Image) => {
        this.task.photo = base64Image;  // Guardamos la imagen en base64
      });
    }
  }*/

  // Método para convertir el archivo a base64
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Método para cancelar y regresar a la página anterior
  onCancel() {
    this.router.navigate(['/listar-task']); // Redirige a la lista de tareas
  }
}
