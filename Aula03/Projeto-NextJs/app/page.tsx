'use client';

import { useState } from 'react';

export default function Home() {
  // Lista de cidades simuladas
  const cidades = [
    { nome: 'São Paulo', temp: '26°C', condicao: 'Ensolarado ☀️', umidade: '55%' },
    { nome: 'Lisboa', temp: '19°C', condicao: 'Parcialmente Nublado ⛅', umidade: '68%' },
    { nome: 'Nova York', temp: '14°C', condicao: 'Chuvoso 🌧️', umidade: '82%' },
    { nome: 'Tóquio', temp: '22°C', condicao: 'Limpo 🌙', umidade: '45%' },
  ];

  const [cidadeSelecionada, setCidadeSelecionada] = useState(cidades[0]);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-2">🌦️ Painel de Clima</h1>
        <p className="text-slate-400 text-center text-sm mb-6">Consulte o tempo nas principais cidades</p>

        {/* Botões de seleção */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {cidades.map((c) => (
            <button
              key={c.nome}
              onClick={() => setCidadeSelecionada(c)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                cidadeSelecionada.nome === c.nome
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {c.nome}
            </button>
          ))}
        </div>

        {/* Card de Resultado */}
        <div className="bg-slate-900 rounded-lg p-5 border border-slate-700 text-center">
          <h2 className="text-xl font-semibold text-blue-400 mb-1">{cidadeSelecionada.nome}</h2>
          <div className="text-4xl font-bold my-3">{cidadeSelecionada.temp}</div>
          <p className="text-lg text-slate-300 mb-4">{cidadeSelecionada.condicao}</p>
          <div className="text-sm text-slate-400 border-t border-slate-800 pt-3 flex justify-around">
            <span>Umidade: <strong>{cidadeSelecionada.umidade}</strong></span>
          </div>
        </div>
      </div>
    </main>
  );
}