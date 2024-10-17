// src/components/LineChart.js

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { get_date } from './func.js';
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
    if (response.list){

      

      let days = parseInt(response.list.length);
      let high_list = [];
      let days_list = [];

      //console.log("lista datas" + get_date(days, response.list[0].create_date));
      //let days = parseInt(response.days);
      //console.log("tamnho da lista é: " + response.list.length);
      //let resp_list = JSON.stringify(response.list);
      //console.log('graf li 46:' + response.list);
      //console.log('tamanho' + response.list.lenght);
      for(let i=0; i<days; i++){
          high_list[days-1-i] = parseFloat(response.list[i].high);
          //console.log("dentro do loop :"+ response.list[i].high);
      }
      let days_list_ = get_date(days, response.list[0].create_date);
      for(let i=0; i<days; i++){
        days_list[i] = days_list_[i].toLocaleDateString('pt-BR') 
      }
      console.log("high_list:"+high_list);

      const data = {
        labels: days_list, // Eixo X
        datasets: [
          {
            label: 'Alta nos últimos dias',
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
            text: 'EUR/BRL',
          },
        },
      };
    
      return <Line data={data} options={options} />;
    }
    else{
      console.log("fail");
    }
  };

export {LineChart};
export {GraficoCotacao};