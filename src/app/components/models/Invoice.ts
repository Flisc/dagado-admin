import {Product} from "./Product";

export class Invoice {
  constructor(public customerName: string,
              public phone: string,
              public email: string,
              public details: string,
              public products: Product[] = []) {
    // Initially one empty product row we will show
    products.push(new Product('', 0, 0));
  }
}
