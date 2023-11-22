import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productId: number | undefined;
  product: any = {}; // Object to hold product details

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      this.fetchProductDetails(this.productId);
    });
  }

  fetchProductDetails(productId: number): void {
    this.authService.getProductDetail(productId).subscribe(
      (productData: any) => {
        this.product = productData; // Set the retrieved product data
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
        // Handle error - show an error message or perform error-specific actions
      }
    );
  }
}
