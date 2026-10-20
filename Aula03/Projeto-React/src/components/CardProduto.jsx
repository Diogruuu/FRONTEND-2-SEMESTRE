import React from 'react';

export function CardProduto({ nome, preco, categoria }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.2rem',
      width: '220px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#ffffff'
    }}>
      <span style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase' }}>{categoria}</span>
      <h3 style={{ margin: '0.5rem 0', color: '#1f2937' }}>{nome}</h3>
      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
        R$ {preco}
      </p>
    </div>
  );
}