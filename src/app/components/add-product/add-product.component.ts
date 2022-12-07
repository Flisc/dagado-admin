import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../service/firebase.service";
import {ServiceModel} from "../models/ServiceModel";

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
  products = new Array<ServiceModel>();
  total: number;
  productsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dbService: FirebaseService
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
    const { name, price } =  this.productsForm.value;
    const newProduct = new ServiceModel(name, price);
    this.products.push(newProduct)
    if(newProduct.price != undefined) {
    this.total += newProduct.price;
    }
    this.dbService.create(newProduct);
    console.log({newProduct});
  }
}
