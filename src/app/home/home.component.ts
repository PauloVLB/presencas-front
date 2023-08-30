import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoriaCardComponent } from '../monitoria-card/monitoria-card.component';
import { Monitoria } from '../monitoria';
import { MonitoriaService } from '../service/monitoria.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MonitoriaCardComponent,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  monitoriaList: Monitoria[] = [];
  //monitoriaService: MonitoriaService = inject(MonitoriaService);

  filteredMonitoriaList: Monitoria[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredMonitoriaList = this.monitoriaList;
    }
  
    this.filteredMonitoriaList = this.monitoriaList.filter(
      monitoria  => monitoria?.nomeMonitor.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor(private monitoriaService: MonitoriaService) {
    /*this.monitoriaList = this.monitoriaService.getAllMonitorias();
    this.filteredMonitoriaList = this.monitoriaList;*/
  }

  ngOnInit(): void {
    this.monitoriaService.getAllMonitoriasHttp().then((monitorias) => {
      this.monitoriaList = monitorias;
      this.filteredMonitoriaList = monitorias;
    });
  }
}