import {Component, OnInit, ViewChild} from '@angular/core';
import {Invoice} from "../models/Invoice";
import {Product} from "../models/Product";
// import {pdfMake} from "pdfmake/build/pdfmake";
// import * as pdf from "pdfmake/build/pdfmake";
// @ts-ignore
// test
const pdf = require('pdfmake/build/pdfmake.js');
const pdfF  = require("pdfmake/build/vfs_fonts");
pdf.vfs = pdfF.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  invoice = new Invoice('', '', 0, '', []);

  constructor() {
  }

  ngOnInit(): void {
  }

  @ViewChild('invoiceForm') invoiceForm: any;

  addProduct() {
    this.invoice.products.push(new Product('', 0, 0));
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
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold: true
              },
              {text: this.invoice.address},
              {text: this.invoice.email},
              {text: this.invoice.contactNo}
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map(p => ([p?.name, p?.price, p.quantity, (p?.price * p.quantity).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {},
                this.invoice.products.reduce((sum, p) =>
                  sum + (p.quantity || 1 * p.price || 1), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          text: this.invoice.customerName,
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{qr: `${this.invoice.customerName}`, fit: '50'}],
            [{text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        }
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
