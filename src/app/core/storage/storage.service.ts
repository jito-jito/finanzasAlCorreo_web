import { Injectable } from '@angular/core';

/**
 * @description
 * Servicio de almacenamiento para gestionar datos en el almacenamiento local del navegador.
 * Proporciona métodos para establecer, obtener, eliminar y limpiar elementos del almacenamiento local.
 */

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
