import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;
  showAlert = false;
  isEditMode = false;
  productId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      image: [''],
      title: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.productId = this.getProductIdFromUrl();

    if (this.productId) {
      this.isEditMode = true;
      this.fetchProductDetails();
    }
  }

  private getProductIdFromUrl(): number | undefined {
    const urlParts = this.router.url.split('/');
    const idIndex = urlParts.indexOf('add-product') + 1;
    return idIndex < urlParts.length ? +urlParts[idIndex] : undefined;
  }

  private fetchProductDetails(): void {
    this.authService.getProductDetail(this.productId!).subscribe(
      (product: any) => {
        this.productForm.patchValue({
          title: product.title,
          color: product.color,
          price: product.price
        });
      },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  onUpdate(): void {
    if (this.productForm.valid && this.productId) {
      const formData = this.productForm.value;
  
      const productData = {
        title: formData.title,
        color: formData.color,
        price: formData.price,
        image: formData.image
        // Add other fields if needed
      };
  
      // Confirm before updating
      const shouldUpdate = window.confirm('Are you sure you want to update this product?');
      if (shouldUpdate) {
        this.authService.updateProduct(this.productId, productData).subscribe(
          (response: any) => {
            console.log('Product updated:', response);
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 3000);
          },
          (error: any) => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        console.log('Product update canceled.');
        alert('Product update canceled.')
      }
    }
  }
  

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      this.convertImageToBase64(formData.image).then((base64Image) => {
        const productData = {
          id: this.productId,
          title: formData.title,
          color: formData.color,
          price: formData.price,
          // Add other fields if needed
        };

        if (this.isEditMode && this.productId) {
          this.updateProduct(productData);
        } else {
          this.addNewProduct(productData);
        }
      });
    }
  }

  convertImageToBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([imagePath]));

      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1] || '';
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  updateProduct(productData: any): void {
    this.authService.updateProduct(this.productId!, productData).subscribe(
      (response) => {
        console.log('Product updated:', response);
        this.showAlert = true;
        this.productForm.reset();
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
      (error: any) => {
        console.error('Error updating product:', error);
      }
    );
  }

  addNewProduct(productData: any): void {
    this.authService.createNewProduct(productData).subscribe(
      (response: any) => {
        console.log('Product added:', response);
        this.showAlert = true;
        this.productForm.reset();
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      },
      (error: any) => {
        console.error('Error adding product:', error);
      }
    );
  }
}
