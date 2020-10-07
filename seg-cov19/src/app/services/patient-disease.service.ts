import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PatientDisease } from '../models/patient-disease';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientDiseaseService {

  constructor(private firestore: AngularFirestore) { }

  getPatientDisease(patient: Patient) {
    const patientRef = this.firestore.collection('patient').doc(patient.Id).ref;
    return this.firestore.collection('patient_disease', ref => ref.where('PatientRef', '==', patientRef )).get();
  }

  savePatientDisease(patientDisease: PatientDisease, patientId: string) {
    if (!patientDisease.Id) {
      patientDisease.Created = new Date();
      patientDisease.PatientRef = this.firestore.collection('patient').doc(patientId).ref;
      this.firestore.collection('patient_disease').add(patientDisease);
    }
    else {
      this.firestore.collection('patient_disease').doc(patientDisease.Id).update(patientDisease);
    }
  }

  MaptoPatientDisease(id: string, data: any): PatientDisease {
    return  ({
      Id: id,
      Treatment: data.Treatment ,
      Diseases: data.Diseases,
      OtherDisease: data.OtherDisease,
     }) as PatientDisease;
  }
}
