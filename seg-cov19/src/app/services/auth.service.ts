import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private header: any;
  constructor(private angularFireAuth: AngularFireAuth ) {
  }

  async login(email: string, password: string) {
    let logged = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      localStorage.setItem('id_token', this.toBase64(result.user.email));
      return true;
    })
    .catch((error) => {
      return false;
      window.alert(error.message);
    });

    return logged;
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  getUserName() {
    const email = this.fromBase64(localStorage.getItem('id_token'));
    return email.substring(0, email.indexOf('@'));
  }

  public isLoggedIn() {
    try {
      const token = localStorage.getItem('id_token');
      if (!token) {
          return false;
      }
      return true;
    } catch (error) {
        return false;
    }
  }

  private toBase64(data: string) {
    return btoa(data);
  }

  private fromBase64(data: string) {
    return atob(data);
  }
}
