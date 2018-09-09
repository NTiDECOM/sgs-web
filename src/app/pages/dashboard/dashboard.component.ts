import { Component, OnInit } from '@angular/core';
import { SocioService } from '../../services/socio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private socioService: SocioService) { }

  socios: any;

  ngOnInit() {
    this.socioService.listarSocios().subscribe(
      (data) => {
        this.socios = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  countSocios() {
    if (this.socios != null) {
      return this.socios.length;
    }
  }

}
