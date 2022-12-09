import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../service/firebase.service";
import {ServiceModel} from "../models/ServiceModel";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  services = new  Array<ServiceModel>();
  selectedServices = new Array<ServiceModel>();
  displayedColumns: string[] = ['position', 'name', 'price'];

  constructor(private dbService: FirebaseService) { }

  ngOnInit(): void {
     this.dbService.getAll().valueChanges().subscribe(value => {
       console.log("db-services", value);
       this.services = value;
     })
  }

  selectService(service: ServiceModel) {
    this.selectedServices.push(service);
    console.log("selectedServices", this.selectedServices);
  }


}
