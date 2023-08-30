import { Injectable } from '@angular/core';
import { Monitoria } from '../monitoria';
import { Aluno } from '../aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor() { }
  readonly apiUrl: string = 'http://localhost:8080';

  async getAllAlunoHttp(): Promise<Aluno[]> {
    const response = await fetch(`${this.apiUrl}/aluno`, {
      method: 'GET'
    });
    const aluno = await response.json();
    return aluno;
  }

  async getMonitoriaByIdHttp(id: number): Promise<Aluno> {
    const response = await fetch(`${this.apiUrl}/aluno/${id}`, {
      method: 'GET'
    });
    const aluno = await response.json();
    return aluno;
  }

  async removeAluno(idMonitoria: number | undefined, idAluno: number): Promise<boolean> {
    await fetch(`${this.apiUrl}/monitoria/${idMonitoria}/aluno/${idAluno}`, {
      method: 'DELETE'
    });
    return true;
  }
}
