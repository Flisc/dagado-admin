import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

type Product = {
  name: string;
  price: number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  products = new Array<Product>();
  total: number;
  productsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.productsForm = formBuilder.group({
      name: formBuilder.control('', [Validators.required]),
      price: formBuilder.control(0, [Validators.required])
    })
    this.total = 0;
  }

  ngOnInit(): void {
  }

  pushData() {
    // this.products.push('prod1', 'prod2');
    console.log(this.productsForm.get('name'))
  }

  onSubmit() {
    const newProduct: Product = { ... this.productsForm.value }
    this.products.push(newProduct)
    if(newProduct.price != undefined) {
    this.total += newProduct.price;
    }
    console.log(this.productsForm.value)
  }
}
