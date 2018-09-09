import { Component, OnInit, ViewChild } from '@angular/core';
import { Socio } from '../../../models/socio';
import { SocioService } from '../../../services/socio.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Mask } from '@fagnerlima/ng-mask';

@Component({
  selector: 'app-socio-form',
  templateUrl: './socio-form.component.html',
  styleUrls: ['./socio-form.component.css']
})
export class SocioFormComponent implements OnInit {

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  readonly dateMask: Mask = new Mask('00/00/0000');
  readonly maskPhone: string = '(00) 00000-0000';
  readonly maskCpf: string = '000.000.000-00';
  readonly maskCnpj: string = '00.000.000/0000-00';

  constructor(private socioService: SocioService) { }

  public socio: Socio;

  ngOnInit() {
    this.socio = new Socio();
  }

  tipoPessoaChange(tipoPessoa) {
    if (tipoPessoa === 'JURIDICA') {
      this.socio.pessoa.sexo = null;
    }
  }

  success() {
    this.successAlert.show();
  }

  swalClose() {
    window.location.reload();
  }

  error(error) {
    console.log(error);
    this.errorAlert.show()
  }

  salvarSocio() {
    this.socioService.salvarSocio(this.socio).subscribe(
      (data) => {
        this.success();
      },
      (error) => {
        this.error(error);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new Error(
      'Something bad happened; please try again later.');
  }

}
