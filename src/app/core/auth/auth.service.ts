import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './auth.model';
import { StorageService } from '../storage/storage.service';

/**
 * @description
 * Servicio de autenticación para gestionar el inicio de sesión,
 * cierre de sesión y registro de usuarios.
 * 
 * Utiliza BehaviorSubject para mantener el estado de la sesión del usuario
 * y StorageService para almacenar y recuperar datos de usuarios.
 */

/**
 * @usageNotes
 * Utilice este servicio para autenticar usuarios en la aplicación y validar si están logueados para acceder a ciertas rutas o funcionalidades.
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storage = inject(StorageService);
  userSession = new BehaviorSubject<User | null>(null)

  constructor() { }

  /**
   * Verifica si hay un usuario autenticado en la sesión.
   * 
   * Utilizado para proteger rutas y funcionalidades que requieren autenticación.
   * 
   * @returns true si hay un usuario autenticado, false en caso contrario.
   */
  isAuthenticated(): boolean {
    return this.userSession.value !== null;
  }

  /**
   * Recibe las credenciales del usuario y verifica si son correctas.
   * 
   * Retorna true si las credenciales son válidas y establece la sesión del usuario.
   * Lanza un error si las credenciales son incorrectas.
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: string, password: string): boolean {
    const currentUser = this.getUsers().find((user: User) => user.email === email && user.password === password);
    
    if(!currentUser) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    this.userSession.next({
      fullName: currentUser ? currentUser.fullName : '',
      alias: currentUser ? currentUser.alias : '',
      password,
      email: email
    });

    return true;
  }

  logout(): void {
    this.userSession.next(null);
  }

  register(fullName: string, alias: string, password: string, email: string): boolean {
    this.userSession.next({
      fullName,
      alias,
      password,
      email
    });

    this.setNewUser({
      fullName,
      alias,
      password,
      email
    });

    return true;
  }



  getUsers() {
    const users = this.storage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  setNewUser(user: User) {
    const users = this.getUsers();
    users.push(user);
    this.storage.setItem('users', JSON.stringify(users));
  }
}
