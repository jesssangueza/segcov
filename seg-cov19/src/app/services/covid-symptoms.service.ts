import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SimpleParameter } from '../models/simple-parameter';

@Injectable({
  providedIn: 'root'
})
export class CovidSymptomsService {

  constructor(private firestore: AngularFirestore) { }

  getCovidSymptoms() {
    return this.firestore.collection('covid_symptoms', ref => ref.orderBy('Key', 'asc')).get();
  }

  MaptoSimpleParameter(data: any): SimpleParameter {
    return  ({
      Key: data.Key ,
      Value: data.Value,
     }) as SimpleParameter;
  }
}
