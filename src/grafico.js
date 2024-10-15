// src/components/LineChart.js

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes obrigatórios do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Dados do gráfico
  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'], // Eixo X
    datasets: [
      {
        label: 'Vendas em 2024',
        data: [65, 59, 80, 81, 56, 55], // Eixo Y
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de Vendas',
      },
    },
  };

  return <Line data={data} options={options} />;
};

const GraficoCotacao = (response) => {
    // Dados do gráfico
    let high_list = [];
    let days_list = [];
    let days = parseInt(response.days);
    //let resp_list = JSON.stringify(response.list);
    console.log('graf li 46:' + response.list);
    //console.log('tamanho' + response.list.lenght);
    for(let i=0; i<days; i++){
        high_list[days-1-i] = parseFloat(response.list[i].high);
        console.log("dentro do loop :"+ response.list[i].high);
    }
    for(let i=0; i<days; i++){
      days_list[i] = i; 
    }
    console.log("high_list:"+high_list);

    const data = {
      labels: days_list, // Eixo X
      datasets: [
        {
          label: 'Vendas em 2024',
          data: high_list, // Eixo Y
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  
    // Opções do gráfico
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Gráfico de Vendas',
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };

export {LineChart};
export {GraficoCotacao};