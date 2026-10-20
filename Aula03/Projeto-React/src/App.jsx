import React from 'react';
import { Header } from './components/Header';
import { CardProduto } from './components/CardProduto';

export function App() {
  const produtos = [
    { id: 1, nome: 'Arroz Integral 5kg', preco: '23,90', categoria: 'Mercearia' },
    { id: 2, nome: 'Feijão Preto 1kg', preco: '7,20', categoria: 'Mercearia' },
    { id: 3, nome: 'Leite Desnatado 1L', preco: '4,50', categoria: 'Laticínios' },
    { id: 4, nome: 'Café Torrado 500g', preco: '14,90', categoria: 'Matinais' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <Header />

      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#374151', textAlign: 'center', marginBottom: '1.5rem' }}>
          Produtos em Destaque
        </h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center'
        }}>
          {produtos.map(item => (
            <CardProduto
              key={item.id}
              nome={item.nome}
              preco={item.preco}
              categoria={item.categoria}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;