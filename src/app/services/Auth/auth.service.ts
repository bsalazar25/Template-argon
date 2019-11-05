import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // crear nuevo usuario
  //  https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]



  // login usuario
  //   https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=[API_KEY]



  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyC6LP9-aWvn7N9tLxufr1RsaWBytpKQxQc';
  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();

  }


  logout() {
    localStorage.removeItem('currentUser');

  }



  login(usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

   

  }

  registrar(usuario: UsuarioModel) {


    // const authData= {
    //   ...usuario ,
    //   returnSecureToken: true
    // }

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };



    return this.http.post(
      `${this.url}/signupNewUser?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }


  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('currentUser', idToken);
  }

  leerToken() {

    if (localStorage.getItem('currentUser')) {
      this.userToken = localStorage.getItem('currentUser');

    } else {
      this.userToken = '';
    }
  }

}
