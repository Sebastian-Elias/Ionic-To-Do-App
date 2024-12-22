import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-create-task',
  templateUrl: './agregar-task.page.html',
  styleUrls: ['./agregar-task.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class AgregarTaskPage {
  newTask = { title: '', description: '', photo: null as string | null | undefined, location: null as { lat: number; lng: number } | null };
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router, private imageCompress: NgxImageCompressService) {}

  // Agregar tarea
  addTask() {
    if (this.newTask.title.trim() && this.newTask.description.trim()) {
      this.taskService.createTask(this.newTask).subscribe(
        (response) => {
          console.log('Tarea creada con éxito:', response);
          // Redirigir a la lista de tareas
          this.router.navigate(['/listar-task']);
        },
        (error) => {
          console.error('Error al crear la tarea:', error);
        }
      );
    }
  }

  // Incluir foto desde la cámara
  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Base64 para almacenar la foto en la base de datos o enviarla a la API
        source: CameraSource.Camera, // Usar la cámara
      });

      // Asignar la foto a newTask.photo
      this.newTask.photo = photo.base64String;
      console.log('Foto tomada', this.newTask.photo);
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  
// Incluir foto
/*
onPhotoSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    // Verificar el tamaño del archivo antes de procesarlo
    const maxSizeInMB = 5; // Tamaño máximo en MB
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > maxSizeInMB) {
      this.errorMessage = 'El archivo es demasiado grande. Por favor, selecciona una imagen más pequeña (menos de 5 MB).';
      return; // No continuar con la conversión si el archivo es demasiado grande
    } else {
      this.errorMessage = ''; // Limpiar el mensaje de error si la imagen es válida
    }

    this.convertToBase64(file).then((base64Image) => {
      this.compressImage(base64Image);
    });
  }
}*/

// Método para convertir el archivo a base64
convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // Resolvemos con la cadena base64
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // Leemos el archivo como base64
  });
}

// Método para comprimir la imagen (recibe el base64)
compressImage(base64Image: string) {
  this.imageCompress.compressFile(base64Image, -1, 30, 30).then(
    (compressedImage) => {
      this.newTask.photo = compressedImage; // Guardar la imagen comprimida como base64
      console.log('Imagen comprimida', compressedImage);
    },
    (error) => {
      console.error('Error al comprimir la imagen', error);
    }
  );
}

  //Abrir cámara al hacer click
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Ubicación
  findLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.newTask.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('Ubicación encontrada:', this.newTask.location);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          alert('No se pudo obtener la ubicación. Por favor, verifica tus permisos.');
        }
      );
    } else {
      alert('La geolocalización no es soportada por tu navegador.');
    }
  }

  // Método para cancelar y regresar a la página anterior
  onCancel() {
    this.router.navigate(['/listar-task']); // Redirige a la lista de tareas
  }
}