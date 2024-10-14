export async function get_coin_info(moeda) {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/'+ moeda);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Pega o JSON da resposta
     
    console.log(data);
    return data; // Retorna o valor da cotação
    
  } catch (error) {
    console.error('Erro ao buscar cotação do Euro:', error);
    return null; // Retorna null em caso de erro para não quebrar o fluxo
  }
}

export function show_cotacao(moeda, loading, dados){
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

