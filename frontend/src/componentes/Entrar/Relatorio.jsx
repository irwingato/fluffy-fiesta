import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tarefas feitas por cada usuário',
    },
  },
};

export function Relatorio() {
  const [data, setData] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5555/usuario')
      .then((usuarios) => {
        const usuariosData = usuarios.data;

        Promise.all(
          usuariosData.map(async (usuario) => {
            const tarefas = await axios.get(`http://localhost:5555/tarefas?userId=${usuario.id}`);
            return {
              usuario: usuario.nome,
              tarefas: tarefas.data,
            };
          })
        ).then((tarefasPorUsuario) => {
          const labels = tarefasPorUsuario.map((item) => item.usuario.name);
          const dataset1Data = tarefasPorUsuario.map((item) => (item.tarefas ? item.tarefas.length : 0));
          const dataset2Data = tarefasPorUsuario.map((item) => item.tarefas ? item.tarefas.length : 0);

          const newData = {
            labels: labels,
            datasets: [
              {
                label: 'Dataset 1',
                data: dataset1Data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset 2',
                data: dataset2Data,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };

          setData(newData);
        });
      })
      .catch((error) => {
        console.error('Erro ao obter usuários:', error);
      });
  }, []);

  return data ? <Bar options={options} data={data} /> : null;
}

export default Relatorio;