import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    // Escuchar cambios en el estado de autenticación
    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.currentUser = userCredential.user;
      console.log('User logged in:', this.currentUser);
      
      // Redirigir al usuario a la página de inicio después de iniciar sesión
      this.router.navigate(['/home']); // Cambia '/home' a la ruta de tu página principal
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Manejar el error más adelante
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.currentUser = null;
    console.log('User logged out');
    
    // Redirigir al usuario a la página de login después de cerrar sesión
    this.router.navigate(['/login']); // Cambia '/login' a la ruta de tu página de login
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }


  async register(name : string ,email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.currentUser = userCredential.user;
      console.log('User registered:', this.currentUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Manejar el error más adelante
    }
  }
}
