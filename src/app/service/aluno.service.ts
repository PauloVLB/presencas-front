import { Injectable } from '@angular/core';
import { Monitoria } from '../monitoria';
import { Aluno } from '../aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor() { }
  readonly apiUrl: string = 'http://localhost:8080';

  async getAllAlunosHttp(): Promise<Aluno[]> {
    const response = await fetch(`${this.apiUrl}/aluno`, {
      method: 'GET'
    });
    const aluno = await response.json();
    return aluno;
  }

  async getAlunoByIdHttp(id: number): Promise<Aluno> {
    const response = await fetch(`${this.apiUrl}/aluno/${id}`, {
      method: 'GET'
    });
    const aluno = await response.json();
    return aluno;
  }

  async removePresencaAluno(idMonitoria: number | undefined, idAluno: number): Promise<boolean> {
    await fetch(`${this.apiUrl}/monitoria/${idMonitoria}/aluno/${idAluno}`, {
      method: 'DELETE'
    });
    return true;
  }

  async adicionarPresencaAluno(idMonitoria: number | undefined, idAluno: number | undefined): Promise<boolean> {
    await fetch(`${this.apiUrl}/monitoria/${idMonitoria}/aluno/${idAluno}`, {
      method: 'POST'
    });
    return true;
  }
}
