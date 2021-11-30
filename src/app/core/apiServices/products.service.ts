import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = "https://fakestoreapi.com";
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.baseUrl + "/products?limit=10");
  }

  getProductDetails(productId: number): Observable<ProductModel>{
    return this.http.get<ProductModel>(this.baseUrl + "/products/" + productId);
  }

  addProduct(product: ProductModel){
    return this.http.post(this.baseUrl + "/products", product );
  }
}
