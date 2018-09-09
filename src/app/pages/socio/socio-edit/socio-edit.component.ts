import { Component, OnInit, ViewChild } from '@angular/core';
import { SocioService } from '../../../services/socio.service';
import { ActivatedRoute } from '@angular/router';
import { Mask } from '@fagnerlima/ng-mask';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
    selector: 'app-socio-edit',
    templateUrl: './socio-edit.component.html',
    styleUrls: ['./socio-edit.component.css']
})
export class SocioEditComponent implements OnInit {

    readonly dateMask: Mask = new Mask('00/00/0000');
    readonly maskPhone: string = '(00) 00000-0000';
    readonly maskCpf: string = '000.000.000-00';
    readonly maskCnpj: string = '00.000.000/0000-00';

    @ViewChild('successAlert') private successAlert: SwalComponent;
    @ViewChild('errorAlert') private errorAlert: SwalComponent;

    socio: any;

    constructor(private socioService: SocioService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params =>
            this.socioService.buscarPorId(params['id']).subscribe(
                (data) => {
                    this.socio = data;
                },
                (error) => {
                    error => console.log(error);
                }
            )
        );
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

}
