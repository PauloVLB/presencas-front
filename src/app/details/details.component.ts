import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MonitoriaService } from '../service/monitoria.service';
import { Monitoria } from '../monitoria';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  alunos: Aluno[] = [];

  buscarAluno?: boolean;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

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
      this.alunos = monitoria.alunos;
    });
  }

  mudarIcone(): void {
    this.buscarAluno = !this.buscarAluno;
  }

  removerAluno(id: number): void {
    if(confirm(`Remover aluno ${id}?`)) {
      this.alunoService.removeAluno(this.monitoria?.id, id).then((result) => {
        if(result) {
          alert(`Aluno ${id} removido!`);
          this.alunos = this.alunos.filter(aluno => aluno.id !== id);
        } else {
          alert(`Ocorreu um erro, o aluno não pôde ser removido!`);
        }
      });
    } else {
      alert(`Aluno ${id} não removido!`);
    }
  }

  getInitials(name: string): string {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[name.split(' ').length - 1];
    return firstName[0] + lastName[0];
  }
  
  submitApplication() {
    this.monitoriaService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
