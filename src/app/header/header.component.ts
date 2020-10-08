import { Component, EventEmitter,  Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showCart = false;
  searchText: string;
  @Input() cartProducts: any[] = [];
  @Output() searchProducts: EventEmitter<string> = new EventEmitter();
  @Output() addProduct: EventEmitter<void> = new EventEmitter();
  constructor() {}

  onRemoveFromCart(index: number): void {
    if (this.cartProducts) {
      this.cartProducts.splice(index, 1);
    }
  }

  clearSearch(): void{
    this.searchText = '';
    this.searchProducts.emit('');
  }

  ngOnInit() {}
}
