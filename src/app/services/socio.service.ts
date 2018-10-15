import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  constructor(private http: HttpClient) { }

  salvarSocio(socio) {
    if (socio.id != null && socio.id != undefined) {
      return this.http.put(environment.baseApi + 'socios/' + socio.id, socio);
    } else {
      return this.http.post(environment.baseApi + 'socios', socio);
    }
  }

  listarSocios() {
    return this.http.get(environment.baseApi + 'socios');
  }

  registrarContribuicao(historicoContribuicao, idSocio) {
    historicoContribuicao.socio = {id: idSocio};
    return this.http.post(environment.baseApi + 'socios/contribuicao', historicoContribuicao);
  }

  listarContribuicoes(idSocio) {
    return this.http.get(environment.baseApi + 'socios/' + idSocio + '/contribuicao');
  }

  buscarPorId(id) {
    return this.http.get(environment.baseApi + 'socios/' + id);
  }

}
