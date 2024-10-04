// src/app/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

// Define la interfaz del producto
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  comments?: { user: string; text: string; rating: number }[]; // Array de comentarios
  averageRating?: number; // Calificación promedio
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Cambia styleUrl por styleUrls
})
export class HomeComponent {
  products: Product[] = []; // Array de productos con tipo Product
  cart: { product: Product; quantity: number }[] = []; // Array para almacenar el carrito

  constructor(
    private router : Router,
    private authService : AuthService
  ) {
    this.loadProducts(); // Cargar productos al inicializar el componente
    
  }

  loadProducts() {
    // Simulación de carga de productos. Esto puede ser reemplazado por una llamada a un servicio.
    this.products = [
      {
        id: '1',
        title: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 10.0,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
      },
      {
        id: '2',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 20.0,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
      },
      {
        id: '3',
        title: 'Producto 3',
        description: 'Descripción del Producto 3',
        price: 30.0,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
      },
      {
        id: '4',
        title: 'Producto 4',
        description: 'Descripción del Producto 4',
        price: 40.0,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
      },
    ];
  }

  addToCart(product: Product) {
    // Comprobar si el producto ya está en el carrito
    const existingProduct = this.cart.find(item => item.product.id === product.id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      existingProduct.quantity += 1;
      console.log(`Cantidad aumentada: ${existingProduct.quantity} de ${existingProduct.product.title}`);
    } else {
      // Si el producto no está en el carrito, añadirlo con cantidad 1
      this.cart.push({ product, quantity: 1 });
      console.log(`Producto añadido al carrito: ${product.title}`);
    }
    
    console.log('Carrito actual:', this.cart);
  }


  handleAuthAction() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout(); 
    } else {
      this.router.navigate(['/login']); // Navega a la página de login
    }
  }

  // Método para verificar si el usuario está autenticado
  isUserAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
