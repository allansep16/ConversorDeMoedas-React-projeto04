import React, { useState, useEffect } from 'react';

function ConversorDeMoedas() {
  const [moedas, setMoedas] = useState([]);
  const [deMoeda, setDeMoeda] = useState('USD');
  const [paraMoeda, setParaMoeda] = useState('EUR');
  const [quantidade, setQuantidade] = useState(1);
  const [resultado, setResultado] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accessKey = 'a6b2a400d34ff5facce79c3152093cbc'; // Use a chave correta aqui

  useEffect(() => {
    const fetchMoedas = async () => {
      try {
        const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}&format=1`);
        const data = await response.json();
        setMoedas([...Object.keys(data.rates)]);
      } catch (error) {
        console.error('Erro ao buscar moedas:', error);
        setError('Erro ao buscar moedas. Tente novamente mais tarde.');
      }
    };

    fetchMoedas();
  }, []);

  const converterMoeda = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}&base=${deMoeda}&symbols=${paraMoeda}&format=1`);
      const data = await response.json();
      
      console.log('Dados da API:', data); // Log para depuração

      if (data.rates && data.rates[paraMoeda]) {
        const taxaDeCambio = data.rates[paraMoeda];
        setResultado(quantidade * taxaDeCambio);
      } else {
        throw new Error('Taxa de câmbio não disponível');
      }
    } catch (error) {
      console.error('Erro ao converter moeda:', error);
      setError('Erro ao converter moeda. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Conversor de Moedas</h2>
      <div>
        <label>De:</label>
        <select value={deMoeda} onChange={(e) => setDeMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Math.max(0, e.target.value))}
          min="0"
        />
      </div>
      <div>
        <label>Para:</label>
        <select value={paraMoeda} onChange={(e) => setParaMoeda(e.target.value)}>
          {moedas.map(moeda => (
            <option key={moeda} value={moeda}>{moeda}</option>
          ))}
        </select>
        <button onClick={converterMoeda} disabled={loading}>Converter</button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Resultado:</h3>
        <p>{resultado.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ConversorDeMoedas;
