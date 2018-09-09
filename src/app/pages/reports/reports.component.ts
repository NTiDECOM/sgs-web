import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  reportAssociados() {
    // this.reportService.reportInscricoes().subscribe(
    //   (pdf) => {
    //     let file = new Blob([pdf], { type: 'application/pdf' });            
    //     var fileURL = URL.createObjectURL(file);
    //     var link = document.createElement('a');
    //     link.href = fileURL;
    //     link.download = 'INSCRICOES_AJE2018.pdf';
    //     link.dispatchEvent(new MouseEvent('click'));
    //   }, 
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

}
