import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  constructor(private http: HttpClient) { }

  salvarSocio(socio) {
    return this.http.post(environment.baseApi + 'socios', socio);
  }

  listarSocios() {
    return this.http.get(environment.baseApi + 'socios');
  }

  buscarPorId(id) {
    return this.http.get(environment.baseApi + 'socios/' + id);
  }

}
