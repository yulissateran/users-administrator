import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  createUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  updateUser(id, user: User) {
    return this.firestore.collection('users').doc(id).set(user);
  }

  getUser(id) {
    this.firestore.collection('users').doc(id).snapshotChanges();
  }

}
