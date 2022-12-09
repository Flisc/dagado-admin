import {Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from "../models/Invoice";
import {Product} from "../models/Product";
import {ServiceModel} from "../models/ServiceModel";
import {FirebaseService} from "../service/firebase.service";

const pdf = require('pdfmake/build/pdfmake.js');
const pdfF = require("pdfmake/build/vfs_fonts");
pdf.vfs = pdfF.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  invoice = new Invoice('', '', '','', []);
  services = new Array<ServiceModel>();
  selectedValue: any;

  constructor(private dbService: FirebaseService) {
  }

  ngOnInit(): void {
    this.dbService.getAll().valueChanges().subscribe(value => {
      this.services = value;
    })
    console.log(this.services);
  }

  @ViewChild('invoiceForm') invoiceForm: any;

  addProduct() {
    this.invoice.products.push(new Product('', 0, 0));
  }

  selectService(service: ServiceModel, productIndex: number) {
    this.invoice.products[productIndex].name = service.name;
    this.invoice.products[productIndex].price = service.price;
  }

  deleteProduct(product: Product) {
    let index = this.invoice.products.indexOf(product)
    this.invoice.products.splice(index, 1);
    console.log(this.invoice.products)
  }

  getTotalFinal() {
    return this.invoice.products.reduce((sum, p) =>
      sum + (p.quantity * p.price), 0).toFixed(2);
  }

  generatePDF(action = 'open') {
    console.log("called")
    console.log(this.invoiceForm)
    let docDefinition = {
      content: [
        {
          text: 'dagado-services',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: 'Informatii Client',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold: true
              },
              {text: this.invoice.phone},
              {text: this.invoice.email},
            ],
            [
              {
                text: `Data: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },

            ]
          ]
        },
        {
          text: 'Servicii',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Produs', 'Pret', 'Cantitate/Buc', 'Total'],
              ...this.invoice.products.map(p => ([p?.name, p?.price, p.quantity, (p?.price * p.quantity).toFixed(2)])),
              [{text: 'Total final', colSpan: 3}, {}, {},
                this.invoice.products.reduce((sum, p) =>
                  sum + (p.quantity * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Detalii suplimentare',
          style: 'sectionHeader'
        },
        {
          text: this.invoice.customerName,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{text: 'Semnatura', alignment: 'right', italics: true}]
          ]
        },

      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };

    if (action === 'download') {
      pdf.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdf.createPdf(docDefinition).print();
    } else {
      pdf.createPdf(docDefinition).open();
    }

  }
}
