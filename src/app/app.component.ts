import { Component, OnInit, VERSION } from "@angular/core";
import { Order, Product } from "./models/product.model";
import { ProductService } from "./service/product.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  cartProducts: Product[] = [];
  products: Product[] = [];
  tempProducts: Product[] = [];
  orderDetail: Order;
  product: Product = { quantity: 0, orderDetail: null };
  showAddProduct: boolean;
  showPopup: boolean;
  orderDetailPopup: boolean;
  warning: string;
  constructor(private productService: ProductService) {}

  guidGenerator() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  onSearchProducts(text: string): void {
    if (this.products && text) {
      this.products = this.products.filter(p => {
        return (
          p.productName &&
          p.productName.toUpperCase().indexOf(text.toUpperCase()) > -1
        );
      });
    } else {
      this.products = [...this.tempProducts];
    }
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(val => {
      val && val.forEach(v => (v.quantity = 0));
      this.products = val || [];
      this.tempProducts = [...this.products];
    });
  }

  onAddProduct(): void {
    if (this.showAddProduct) return;
    this.showAddProduct = true;
    this.product = { quantity: 0 };
  }

  addProduct(): void {
     if (!this.product.availableQuantity) {
      this.showPopup = true;
      this.warning = "atleast add 1 available quantity";
    }
    this.product.productId = this.guidGenerator();
    this.productService.addProduct(this.product).subscribe(val => {
      this.products.push({...this.product});
      this.tempProducts.push({...this.product});
      this.showAddProduct = false;
    });
  }

  orderProduct(product: Product): void {
    let order: Order = new Order();
    order.customerId = this.guidGenerator();
    order.orderId = this.guidGenerator();
    order.productId = product.productId;
    order.quantity = product.availableQuantity;
    if (!product.quantity || product.quantity < 0) {
      this.showPopup = true;
      this.warning = "atleast add 1 quantity";
      return;
    } else if (product.quantity > product.availableQuantity) {
      this.showPopup = true;
      this.warning =  "Products not avalilable try reducing quantity.";
      return;
    }
    this.productService.orderProduct(order).subscribe(val=>{
      product.ordered = true;
      product.orderDetail = order;
    })
  }

  onShowOrderDetail(order: Order): void{
    if(!order) return;
    this.orderDetailPopup = true;
    this.orderDetail = {...order};
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
