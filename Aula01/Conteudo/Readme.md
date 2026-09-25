# 🎮 TERMO

Uma recriação em código do popular jogo de adivinhação de palavras, desenvolvida utilizando HTML, CSS e JavaScript sem bibliotecas externas. O objetivo é adivinhar a palavra secreta de 5 letras. A cada palpite, o sistema altera a cor das letras para indicar o progresso do jogador.

## 📌 Recursos e Funcionalidades

* **Validação de Palavras:** Aceita apenas palpites com exatamente 5 letras.
* **Tabuleiro Dinâmico:** Exibe o histórico de palpites em grelha.
* **Feedback Visual:**
  * 🟩 **Verde:** A letra faz parte da palavra e está no lugar certo.
  * 🟨 **Amarelo:** A letra existe na palavra, mas noutra posição.
  * ⬜ **Cinzento:** A letra não pertence à palavra secreta.
* **Celebração:** Mensagem animada exibida em caso de acerto.
* **Novo Jogo:** Botão para reiniciar a partida a qualquer momento.

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)

## 📁 Estrutura de Ficheiros

```text
termo/
│
├── index.html
├── style.css
├── script.js
└── README.md
