import './App.css';
import Sidebar from './Sidebar'; 
import { useEffect, useState } from 'react';
import { get_coin_info, get_coin_info_list } from './api.js';
import {LineChart, GraficoCotacao} from './grafico.js';


let moeda = 'EUR-BRL'; 

function App() {
  // Definindo estados para o conteúdo e a cotação
  const [content, setContent] = useState('Bem-vindo! Selecione um item no menu.');
  const [dados, setDados] = useState(null); // Estado para armazenar o preço da cotação
  const [loading, setLoading] = useState(false); // Estado para mostrar se os dados estão carregando
  const [refresh, setRefresh] = useState(false);
  // Função para alterar o conteúdo
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // useEffect para buscar os dados da cotação quando o conteúdo for 'Cotação'
  useEffect(() => {
    const fetchData = async () => {
      if (content === 'Cotação') {
        setLoading(true); // Inicia o estado de carregamento
        const data = await get_coin_info('EUR-BRL');
        if (data && data.EURBRL) {
          setDados(data.EURBRL); // Define o preço no estado
        }
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchData(); // Chama a função assíncrona
  }, [content, refresh]); // O useEffect depende da mudança de 'content'

  useEffect(() => {
    const fetchData_ = async () => {
      if (content === 'Gráfico Cotação') {
        setLoading(true); // Inicia o estado de carregamento
        const data = await get_coin_info_list('EUR-BRL',50);
        if (data) {
          setDados(data); // Define o preço no estado
        }
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchData_(); // Chama a função assíncrona
  }, [content]); // O useEffect depende da mudança de 'content'

  let displayContent;
  if (content === 'Bem-vindo! Selecione um item no menu.') {
    displayContent = 
      <div>
      <h1>{content}</h1>
      <button>Aperte aqui</button>
      </div>;

  } else if (content === 'Gráfico Teste') {
    displayContent = (
    <div className="grafico">
      <h1>Exemplo de Gráfico em React</h1>
      <LineChart />
    </div>);
   
  } else if (content === 'Gráfico Cotação'){
    if (loading){
      displayContent = <h1>Carregando cotação...</h1>;
    }
    else if(dados){
      console.log('linha 72:' + dados);
      displayContent = (
        <div className="grafico">
          <h1>Gráfico Cotação</h1>
          <GraficoCotacao list={dados} days={50} /> 
        </div>);
    }
    else {
      displayContent = <h1>Erro ao buscar a cotação</h1>;
    }
  }
  
  
  
  
  else if(content ==='Home') {
    displayContent = <h1>{content}</h1>;
  }
  
  else if (content === 'Cotação') {
    if (loading) {
      displayContent = <h1>Carregando cotação...</h1>;
    } else if (dados) {
      
      displayContent = (
        <div>
          <div><h1>{content}</h1></div>

          <div className="subcontent">
            <h1 font-size='5px'>{dados.name}</h1>
            <h1>Preço Alta: {dados.high}</h1>
            <h1>Preço Baixa: {dados.low}</h1>
            <h1>Tempo: {dados.create_date}</h1>
            
            <button className="refresh-btn" onClick={() => setRefresh(prev => !prev)}>
            Atualizar 
          </button>
          </div>
        </div>
      );
    } else {
      displayContent = <h1>Erro ao buscar a cotação</h1>;
    }
  }

  return (
    <div className="App">
      <Sidebar onContentChange={handleContentChange} />
      <div className="content">
        {displayContent} {/* Mostrando o texto central com base na condição */}
      </div>
    </div>
  );
}

export default App;
