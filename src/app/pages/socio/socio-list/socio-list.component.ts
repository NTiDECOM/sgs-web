import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SocioService } from '../../../services/socio.service';

@Component({
  selector: 'app-socio-list',
  templateUrl: './socio-list.component.html',
  styleUrls: ['./socio-list.component.css']
})
export class SocioListComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  socios: any;

  constructor(private socioService: SocioService) { }

  ngOnInit() {
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
    this.socioService.listarSocios().subscribe(
      (data) => {
        this.socios = data;
        this.rerender();
      },
      (error) => {
        console.log(error);
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
