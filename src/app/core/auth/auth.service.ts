import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './auth.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storage = inject(StorageService);
  userSession = new BehaviorSubject<User | null>(null)

  constructor() { }

  isAuthenticated(): boolean {
    return this.userSession.value !== null;
  }

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
