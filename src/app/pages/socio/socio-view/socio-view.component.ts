import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { SocioService } from '../../../services/socio.service';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from '../../../../../node_modules/angular-datatables';
import { Subject } from '../../../../../node_modules/rxjs';
import { Mask } from '../../../../../node_modules/@fagnerlima/ng-mask';
import { SwalComponent } from '../../../../../node_modules/@toverux/ngx-sweetalert2';

declare var $: any;

@Component({
  selector: 'app-socio-view',
  templateUrl: './socio-view.component.html',
  styleUrls: ['./socio-view.component.css']
})
export class SocioViewComponent implements AfterViewInit, OnDestroy, OnInit {

  readonly dateMask: Mask = new Mask('00/00/0000');
  readonly dateMesAnoMask: Mask = new Mask('00/0000');
  readonly maskMoney: string = '000.00';

  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('errorAlert') private errorAlert: SwalComponent;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  socio: any;
  contribuicoes: any;

  newContribuicao: any;

  constructor(private socioService: SocioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.newContribuicao = {};
    this.dtOptions = {
      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        thousands: ".",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        search: "Pesquisar",
        paginate: {
            next: "Próximo",
            previous: "Anterior",
            first: "Primeiro",
            last: "Último"
        },
        aria: {
            sortAscending: ": Ordenar colunas de forma ascendente",
            sortDescending: ": Ordenar colunas de forma descendente"
        }
    },
      responsive: true
    };
    this.route.params.subscribe( params => 
      this.socioService.buscarPorId(params['id']).subscribe(
        (data) => {
          this.socio = data;
          this.socioService.listarContribuicoes(params['id']).subscribe(
            (data) => {
              this.contribuicoes = data;
              this.rerender();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          error => console.log(error);
        }
      )
    );
  }

  success() {
    this.successAlert.show();
  }

  error(error) {
    console.log(error);
    this.errorAlert.show()
  }

  swalClose() {
    window.location.reload();
  }

  abreModalContribuicao() {
    $('#modalContribuicao').modal('toggle');
  }

  registarContribuicao() {
    this.socioService.registrarContribuicao(this.newContribuicao, this.socio.id).subscribe(
      (data) => {
        $('#modalContribuicao').modal('hide');
        this.success();
      }, 
      (error) => {
        this.error(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
