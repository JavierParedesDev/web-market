import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../home/home.component'; // Asegúrate de que la ruta del modelo sea correcta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Asegúrate de que sea 'styleUrls'
})
export class ProductComponent implements OnInit {
  productId: string | null = null; // Variable para almacenar el ID del producto

  product: Product = {
    id: "",
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    comments: [], // Inicializa el array de comentarios
    averageRating: 0 // Inicializa la calificación promedio
  };

  newComment = { user: '', text: '', rating: 0 }; // Objeto para nuevo comentario

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para obtener el ID del producto
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log('ID del producto:', this.productId);
      this.loadProduct(this.productId);
    });
  }

  loadProduct(id: string | null) {
    // Puedes obtener los productos de un servicio o un array estático.
    const products: Product[] = [
      {
        id: '1',
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 10.00,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
        comments: [], // Inicializa como array vacío
        averageRating: 0
      },
      {
        id: '2',
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 20.00,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
        comments: [],
        averageRating: 0
      },
      {
        id: '3',
        title: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 30.00,
        imageUrl: 'https://www.garnier.cl/-/media/project/loreal/brand-sites/garnier/usa/latam/es/prd-haircare/fructis-probioticos/shampoo-350ml/7509552930535_13.jpg?w=1200&rev=db99af78ec334ac2b90a7fb9efd4faa1&hash=AD6293C8012287771E266F31D4465D95',
        comments: [],
        averageRating: 0
      }
    ];

    // Verificar si el ID es válido
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        this.product = foundProduct;
      } else {
        console.error('Producto no encontrado');
      }
    } else {
      console.error('ID de producto no válido');
    }
  }

  addComment() {
    if (this.newComment.user && this.newComment.text && this.newComment.rating) {
      this.product.comments?.push({ ...this.newComment });
      this.newComment = { user: '', text: '', rating: 0 }; // Resetea el comentario
      this.updateAverageRating();
    } else {
      console.error('Complete todos los campos del comentario');
    }
  }

  updateAverageRating() {
    if (this.product.comments) {
      const totalRating = this.product.comments.reduce((sum, comment) => sum + comment.rating, 0);
      this.product.averageRating = totalRating / this.product.comments.length;
    }
  }
}
