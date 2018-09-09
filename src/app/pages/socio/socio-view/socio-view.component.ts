import { Component, OnInit } from '@angular/core';
import { SocioService } from '../../../services/socio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-socio-view',
  templateUrl: './socio-view.component.html',
  styleUrls: ['./socio-view.component.css']
})
export class SocioViewComponent implements OnInit {

  socio: any;

  constructor(private socioService: SocioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => 
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

}
