import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from '../service/monitoria.service';
import { Monitoria } from '../monitoria';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Aluno } from '../aluno';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlunoService } from '../service/aluno.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  monitoriaService = inject(MonitoriaService);
  alunoService = inject(AlunoService);
  monitoria: Monitoria | undefined;
  alunosMonitoria: Aluno[] = [];
  todosAlunos: Aluno[] = [];
  autocompleteAlunos: Aluno[] = [];

  buscarAluno?: boolean;

  formPesquisarAluno = new FormGroup({
    nomeAluno: new FormControl(''),
  });

  pesquisarAluno(): void {
    const alunoSelecionado: Aluno | undefined = this.autocompleteAlunos.find(aluno => aluno.nome === this.formPesquisarAluno.value.nomeAluno);
    if(!alunoSelecionado) {
      alert(`Aluno ${this.formPesquisarAluno.value.nomeAluno} não encontrado!`);
    } else {
      if(!this.buscarAluno) { // se é para adicionar presença
        const alunoPresente: Aluno | undefined = 
              this.alunosMonitoria.find(aluno => aluno.nome === this.formPesquisarAluno.value.nomeAluno);

        if(alunoPresente) {
          alert(`Aluno ${alunoSelecionado?.nome} já está presente!`);
          return;
        }
        
        this.alunoService.adicionarPresencaAluno(this.monitoria?.id, alunoSelecionado?.id).then((result) => {
          if(result) {
            alert(`Presença concedida para ${alunoSelecionado?.nome}!`);
            this.alunosMonitoria.push(alunoSelecionado);
          } else {
            alert(`Ocorreu um erro, a presença não pôde ser adicionada!`);
          }
        });
      } else { // se é para buscar o aluno
        alert(`Aluno ${this.formPesquisarAluno.value.nomeAluno} já está presente!`);
      }
    }
  }

  constructor() {
    /*const monitoriaId = Number(this.route.snapshot.params['id']);
    this.monitoria = this.monitoriaService.getMonitoriaById(monitoriaId);
    this.alunos = this.monitoria?.alunos ?? [];*/
    this.buscarAluno = false;
  }

  ngOnInit(): void {
    const monitoriaId = Number(this.route.snapshot.params['id']);
    this.monitoriaService.getMonitoriaByIdHttp(monitoriaId).then((monitoria) => {
      this.monitoria = monitoria;
      this.alunosMonitoria = monitoria.alunos;
    });
    this.alunoService.getAllAlunosHttp().then((alunos) => {
      this.todosAlunos = alunos;
      this.autocompleteAlunos = alunos;
    });
  }

  mudarOpcaoPesquisa(): void {
    this.buscarAluno = !this.buscarAluno;
    if(this.buscarAluno) {
      this.autocompleteAlunos = this.alunosMonitoria;
    } else {
      this.autocompleteAlunos = this.todosAlunos;
    }
  }

  removerAluno(id: number): void {
    if(confirm(`Remover aluno?`)) {
      this.alunoService.removePresencaAluno(this.monitoria?.id, id).then((result) => {
        if(result) {
          alert(`Aluno removido!`);
          this.alunosMonitoria = this.alunosMonitoria.filter(aluno => aluno.id !== id);
        } else {
          alert(`Ocorreu um erro, o aluno não pôde ser removido!`);
        }
      });
    } else {
      alert(`Aluno não removido!`);
    }
  }

  getInitials(name: string): string {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[name.split(' ').length - 1];
    return firstName[0] + lastName[0];
  }
}
