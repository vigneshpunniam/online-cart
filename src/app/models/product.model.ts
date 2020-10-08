export class Product{
    productName?: string;
    productId?: string;
    availableQuantity?: number;
    quantity?: number;
    ordered?: boolean;
    orderDetail?: Order;
}


export class Order {
  orderId: string;
  customerId: string;
  productId: string;
  quantity: number;
}