import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SimpleParameter } from '../models/simple-parameter';

@Injectable({
  providedIn: 'root'
})
export class DiseaseTypeService {

  constructor(private firestore: AngularFirestore) { }

  getDiseaseTypes() {
    return this.firestore.collection('disease_type', ref => ref.orderBy('Key', 'asc')).get();
  }

  MaptoSimpleParameter(data: any): SimpleParameter {
    return  ({
      Key: data.Key ,
      Value: data.Value,
     }) as SimpleParameter;
  }
}
