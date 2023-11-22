import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Import your AuthService
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  commentsData: any[] = []; // Variable to store comments data
  private fetchSubscription: Subscription | undefined;
  firstLoad: boolean = true;
  constructor(private authService: AuthService, private router: Router) { }

  viewProduct(comment: any): void {
    // Pass the product ID to the ViewProductComponent using the route
    this.router.navigate(['/view-product', comment.id]);
  }


  editProduct(comment: any): void {
    // Redirect to the AddProductComponent with the product ID as a parameter
    this.router.navigate(['/add-product', comment.id]);
  }
  ngOnInit(): void {
    this.fetchProductList();
    this.fetchSubscription = interval(10000).subscribe(() => this.fetchProductList());
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks when the component is destroyed
    if (this.fetchSubscription) {
      this.fetchSubscription.unsubscribe();
    }
  }
  fetchProductList(): void {
    this.authService.getProducts().subscribe(
      (data) => {
        console.log(data);

        // Convert base64-encoded images to Image objects
        const productsWithImages = data.map(product => {
          return {
            ...product,
            image: typeof product.image === 'string' ? this.base64ToImage(product.image) : product.image,
          };
        });

        if (!this.firstLoad) {
          // Check for new products based on createdAt timestamps
          const newProducts = productsWithImages.filter(product => !this.commentsData.some(existingProduct => existingProduct.id === product.id));

          if (newProducts.length > 0) {
            console.log('New products added:', newProducts);

            // You can trigger an alert or take any other action here
            this.showAlert('New products added!', 2000);
          }
        }

        // Update commentsData
        this.commentsData = productsWithImages;

        // Set firstLoad to false after the initial load
        this.firstLoad = false;

        // Now, productsWithImages array contains Image objects for each product
        console.log('Products with Images:', productsWithImages);
      }
    );
  }
  showAlert(message: string, duration: number): void {
    alert(message);

    // Hide the alert after the specified duration
    setTimeout(() => {
      // Code to hide or close the alert
      // For simplicity, let's close the alert by reloading the page
      window.location.reload();
    }, duration);
  }

  deleteProduct(comment: any): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.authService.deleteProduct(comment.id).subscribe(
        () => {
          // Remove the deleted product from the commentsData array
          this.commentsData = this.commentsData.filter((item) => item.id !== comment.id);
        },
        (error) => {
          console.error('Error deleting product:', error);
          // Handle error - show an error message or perform error-specific actions
        }
      );
    }
  }
  base64ToImage(base64String: string): HTMLImageElement {
    const img = new Image();
    img.src = `data:image/png;base64,${base64String}`;
    return img;
  }



}
