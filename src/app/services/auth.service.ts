import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  loginResponseModel,
  productModel,
  resetPasswordModel,
  resetPasswordResponseModel,
  userModel
} from '../admin/models.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/posts';
  private apiUrl2 = 'http://localhost:3000/comments';
  public loggedIn = false;

  constructor(private http: HttpClient) {}

  initLoginState(): void {
    this.loggedIn = !!localStorage.getItem('token');
  }

  login(userData: userModel): Observable<loginResponseModel> {
    return this.http.post<loginResponseModel>('http://localhost:3000/login', userData).pipe(
      tap((response) => {
        if (response && response.token) {
          this.loggedIn = true;
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserByEmail(email: string): Observable<resetPasswordResponseModel> {
    return this.http.get<resetPasswordResponseModel>('http://localhost:3000/check-user', {
      params: { email: email }
    });
  }

  resetPassword(request: resetPasswordModel): Observable<resetPasswordModel> {
    return this.http.post<resetPasswordModel>('http://localhost:3000/reset-password', request);
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/register', userData);
  }

  createNewProduct(data: productModel): Observable<productModel> {
    return this.http.post<productModel>('http://localhost:3000/products', data);
  }

  getProducts(): Observable<productModel[]> {
    return this.http.get<productModel[]>('http://localhost:3000/products');
  }

  getProductDetail(id: number): Observable<productModel> {
    return this.http.get<productModel>(`http://localhost:3000/products/${id}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/products/${productId}`);
  }

  updateProductDetails(productId: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/${productId}`, productData);
  }

  updateProduct(id: number, product: productModel): Observable<productModel> {
    return this.http.put<productModel>(`http://localhost:3000/products/${id}`, product);
  }

  getProductDetails(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${productId}`);
  }
}
