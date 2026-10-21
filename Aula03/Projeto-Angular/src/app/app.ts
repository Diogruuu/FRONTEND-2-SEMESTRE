import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  listaCitacoes = [
    { texto: "A simplicidade é o pré-requisito da confiabilidade.", autor: "Edsger W. Dijkstra" },
    { texto: "Código é como humor. Quando você precisa explicá-lo, ele é ruim.", autor: "Cory House" },
    { texto: "Simplicidade é a alma da eficiência.", autor: "Austin Freeman" },
    { texto: "Faça funcionar, faça certo, faça rápido.", autor: "Kent Beck" },
    { texto: "A melhor maneira de prever o futuro é inventá-lo.", autor: "Alan Kay" }
  ];

  citacaoAtual = this.listaCitacoes[0];
  totalVisualizadas = 1;

  sortearCitacao() {
    const indiceAleatorio = Math.floor(Math.random() * this.listaCitacoes.length);
    this.citacaoAtual = this.listaCitacoes[indiceAleatorio];
    this.totalVisualizadas++;
  }
}