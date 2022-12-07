import { Product } from "./Product";
import { ServiceModel } from "./ServiceModel";

export class Invoice {
  constructor(public customerName: string,
              public address: string,
              public contactNo: number,
              public email: string,
              public products: Product[] = []) {
    // Initially one empty product row we will show
    products.push(new Product('', 0, 0));
  }
}
