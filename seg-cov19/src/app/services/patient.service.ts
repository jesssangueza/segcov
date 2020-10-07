import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private firestore: AngularFirestore) { }

  getPatients() {
    return this.firestore.collection('patient').snapshotChanges();
  }

  getCountPatients() {
    return this.firestore.collection('patient').get().toPromise();
  }

  getNextPaginatedPatients(pagination: Pagination) {
    if (pagination.Page === 1) {
      return this.firestore.collection('patient', ref => ref.limit(pagination.PageSize).orderBy('Created', 'desc'))
      .snapshotChanges();
    }
    else {
      return this.firestore.collection('patient', ref => ref.orderBy('Created','desc').startAfter(pagination.LastVisible).limit(pagination.PageSize))
      .snapshotChanges();
    }
  }

  getPrevPaginatedPatients(pagination: Pagination) {
    if (pagination.Page === 1) {
      return this.firestore.collection('patient', ref => ref.orderBy('Created','desc').limit(pagination.PageSize))
      .snapshotChanges();
    }
    else {
      return this.firestore.collection('patient', ref => ref.orderBy('Created','desc').endBefore(pagination.FirstVisible).limitToLast(pagination.PageSize))
      .snapshotChanges();
    }
  }

  getPatient(patientId: string) {
    return this.firestore.collection('patient').doc(patientId).snapshotChanges();
  }

  save(patient: Patient) {
    if (!patient.Id) {
      patient.Created = new Date();
      this.firestore.collection('patient').add(patient);
    }
    else {
      this.firestore.collection('patient').doc(patient.Id).update(patient);
    }
  }

  searchPatient(firstName: string) {
    return this.firestore.collection('patient', ref => ref.orderBy('MiddleName').startAt(firstName).endBefore(firstName + '\uf8ff')).snapshotChanges();
  }

  MaptoPatient(id: string, data: any): Patient {
    return new Patient({ Id: id ,
      FirstName: data.FirstName,
      MiddleName: data.MiddleName,
      LastName: data.LastName,
      Age: data.Age,
      Telephone: data.Telephone,
      Sex: data.Sex,
      Type: data.Type });
  }
}