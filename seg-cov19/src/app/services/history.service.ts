import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { History, HistoryViewModel} from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private firestore: AngularFirestore) { }

  getHistoryByPatient(patientId: string) {
    const patientRef = this.firestore.collection('patient').doc(patientId).ref;
    return this.firestore
      .collection('history', ref => ref.orderBy('Created', 'desc').where('PatientRef', '==', patientRef )).snapshotChanges();
  }

  getHistory(historyId: string) {
    return this.firestore.collection('history').doc(historyId).snapshotChanges();
  }

  saveHistory(patientId: string, history: History) {
    if (!history.Id) {
      history.PatientRef = this.firestore.collection('patient').doc(patientId).ref;
      this.firestore.collection('history').add(history);
    }
    else {
      this.firestore.collection('history').doc(history.Id).update(history);
    }
  }

  MaptoHistory(id: string, data: any): HistoryViewModel {
    return  ({
      Id: id,
      AbcgoalCalification: data.AbcgoalCalification,
      Treatment: data.Treatment,
      Evolution: data.Evolution,
      OtherTests: data.OtherTests,
      Symptoms: data.Symptoms,
      Collapse: true,
      DescriptiveSymptoms: [],
      Created: data.Created
    }) as HistoryViewModel;
  }
}
