import { Aluno } from './aluno';

export interface Monitoria {
    id: number;
    nomeMonitor: string;
    data: string;
    horario: string;
    sala: string;
    alunos: Aluno[];
}