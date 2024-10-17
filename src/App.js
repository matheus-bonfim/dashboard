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
  const [refresh_cot, setRefresh_cot] = useState(false);
  const [dados_dias, setDados_dias] = useState(null);
  const [input_dias, setInput_dias] = useState(30);
  const [temp_input_dias, setTemp_input_dias] = useState(30);
  
  
  
  // Função para alterar o conteúdo
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const handle_input_enter = (e) => {
    if (e.key === 'Enter'){
      const days_ = parseInt(temp_input_dias);
      if(!isNaN(days_) && days_ > 0 && days_ < 366){
        setInput_dias(temp_input_dias);
        //setRefresh_cot(prev => !prev);
        }
      else{
        alert('INSIRA UM NÚMERO VÁLIDO!');
      }
    }
  }
  const handle_input_barra = (e) => {
    setTemp_input_dias(e.target.value); 
  }
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
        console.log("input_dias:" + input_dias);
        const data_dias = await get_coin_info_list('EUR-BRL',input_dias);
        if (data_dias) {
          setDados_dias(data_dias);
          console.log("66:    " + data_dias);
        }
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchData_(); // Chama a função assíncrona
  }, [content, input_dias]); // O useEffect depende da mudança de 'content'

  
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
    
    else if(dados_dias && dados_dias[0].high){
      console.log('linha 72:' + dados_dias);
      displayContent = (
        <div> 
          <div className="grafico">
            <h1>Gráfico Cotação</h1>
            <GraficoCotacao list={dados_dias}/> 
          </div>
          <div className="barra_busca">
            <input
                type="text"
                value={temp_input_dias}
                onChange={handle_input_barra} // Atualiza o estado com o valor digitado
                onKeyDown={handle_input_enter} // Captura a tecla pressionada
                placeholder="Digite algo e pressione Enter"
                min="1"
                max="366"
            />
          </div>
        </div>

         
      
      
      );
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
