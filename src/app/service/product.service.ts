import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order, Product } from "../models/product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      "https://uiexercise.onemindindia.com/api/Product"
    );
  }

  addProduct(product: Product): Observable<boolean> {
    return this.http.post<boolean>(
      "https://uiexercise.onemindindia.com/api/Product",
      product
    );
  }

  orderProduct(order: Order): Observable<boolean> {
    return this.http.post<boolean>(
      "https://uiexercise.onemindindia.com/api/OrderProducts",
      order
    );
  }
}
