import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {ServiceModel} from "../models/ServiceModel";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  servicesRef: AngularFireList<ServiceModel>;
  private dbPath = '/dagado-services';

  constructor(private db: AngularFireDatabase) {
    this.servicesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ServiceModel> {
    return this.servicesRef;
  }

  create(service: ServiceModel): any {
    return this.servicesRef.push(service);
  }

}
