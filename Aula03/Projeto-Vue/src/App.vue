<script setup>
import { ref } from 'vue'

// 1. ESTADO (Variáveis reativas do Vue)
const novaTarefa = ref('')
const tarefas = ref([
  'Estudar Vue.js',
  'Fazer exercícios de Front-end'
])

// 2. FUNÇÕES (Ações da tela)
const adicionarTarefa = () => {
  if (novaTarefa.value.trim() !== '') {
    tarefas.value.push(novaTarefa.value)
    novaTarefa.value = '' // Limpa o campo de texto
  }
}

const removerTarefa = (index) => {
  tarefas.value.splice(index, 1) // Remove a tarefa pelo índice
}
</script>

<template>
  <div class="container">
    <h1>📋 Lista Simples de Tarefas</h1>
    <p class="contador">Total de tarefas: <strong>{{ tarefas.length }}</strong></p>

    <!-- Formulário para adicionar -->
    <div class="form-grupo">
      <input 
        v-model="novaTarefa" 
        type="text" 
        placeholder="Digite uma nova tarefa..." 
      />
      <button @click="adicionarTarefa">Adicionar</button>
    </div>

    <!-- Lista de tarefas -->
    <ul>
      <li v-for="(tarefa, index) in tarefas" :key="index">
        <span>{{ tarefa }}</span>
        <button @click="removerTarefa(index)" class="btn-remover">Excluir</button>
      </li>
    </ul>

    <!-- Mensagem caso não haja tarefas -->
    <p v-if="tarefas.length === 0" class="sem-tarefas">
      Nenhuma tarefa cadastrada!
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #333333;
}

h1 {
  font-size: 1.5rem;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 8px;
}

.contador {
  color: #666666;
  text-align: center;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.form-grupo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
  color: #333333;
  font-size: 0.95rem;
  outline: none;
}

input:focus {
  border-color: #42b883;
}

button {
  padding: 10px 16px;
  background-color: #42b883;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #33a06f;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: #f8f9fa;
  color: #333333;
  margin-bottom: 8px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.btn-remover {
  background-color: #ff4d4d;
  padding: 6px 10px;
  font-size: 0.8rem;
}

.btn-remover:hover {
  background-color: #cc0000;
}

.sem-tarefas {
  text-align: center;
  color: #888888;
  font-style: italic;
  margin-top: 15px;
}
</style>