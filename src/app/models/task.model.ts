// src/app/models/task.model.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    photo: string | null;
    location: { lat: 0, lng: 0 }
  }
  