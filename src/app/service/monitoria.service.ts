import { Injectable } from '@angular/core';
import { Monitoria } from '../monitoria';

@Injectable({
  providedIn: 'root'
})
export class MonitoriaService {
  /*
  monitoriaList: Monitoria[] = [
    {
      id: 1,
      nomeMonitor: "Esther",
      data: "2023-02-01",
      horario: "T34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Paulo Vitor Lima Borges",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Carlos Ubelino de Souza",
          turma: "T06"
        }
      ]
    },
    {
      id: 2,
      nomeMonitor: "Dante",
      data: "2023-04-17",
      horario: "T34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 3,
      nomeMonitor: "Tobias",
      data: "2023-12-23",
      horario: "T34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 4,
      nomeMonitor: "Dante",
      data: "2023-03-22",
      horario: "T34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 5,
      nomeMonitor: "Dante",
      data: "2023-12-23",
      horario: "T34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 6,
      nomeMonitor: "Tobias",
      data: "2023-12-23",
      horario: "M34",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 7,
      nomeMonitor: "Esther",
      data: "2023-02-12",
      horario: "T12",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
    {
      id: 8,
      nomeMonitor: "Tobias",
      data: "2023-11-06",
      horario: "M12",
      sala: "A220",
      alunos: [
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        },
        {
          id: 3,
          nome: "Aluno Legal",
          turma: "T04"
        }
      ]
    },
  ];*/
  constructor() { }
  
  readonly apiUrl: string = 'http://localhost:8080';

  async getAllMonitoriasHttp(): Promise<Monitoria[]> {
    const response = await fetch(`${this.apiUrl}/monitoria`, {
      method: 'GET'
    });
    const monitorias = await response.json();
    return monitorias;
  }

  async getMonitoriaByIdHttp(id: number): Promise<Monitoria> {
    const response = await fetch(`${this.apiUrl}/monitoria/${id}`);
    const monitoria = await response.json();
    return monitoria;
  }

  /*getAllMonitorias(): Monitoria[] {
    return this.monitoriaList;
  }
  
  getMonitoriaById(id: number): Monitoria | undefined {
    return this.monitoriaList.find(monitoria => monitoria.id === id);
  }*/
  
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
