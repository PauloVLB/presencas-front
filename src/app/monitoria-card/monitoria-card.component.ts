import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Monitoria } from '../monitoria';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'monitoria-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './monitoria-card.component.html',
  styleUrls: ['./monitoria-card.component.css']
})
export class MonitoriaCardComponent {
  @Input() monitoria!: Monitoria;

  diaMonitoria: string = "";
  mesMonitoria: string = "";

  ngOnInit () {
    this.diaMonitoria = this.monitoria.data.slice(-2);
    this.mesMonitoria = this.getMonthName(Number(this.monitoria.data.slice(5, 7)));
  }

  getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('pt-BR', {
      month: 'long',
    }).slice(0, 3);
  }
}
