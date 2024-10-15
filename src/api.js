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

export async function get_coin_info_list(moeda, days) {
  try {
    const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}/${days}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Pega o JSON da resposta
     
    console.log('aqui esta:' + data);
    return data; // Retorna o valor da cotação
    
  } catch (error) {
    console.error('Erro ao buscar cotação do Euro:', error);
    return null; // Retorna null em caso de erro para não quebrar o fluxo
  }
}
