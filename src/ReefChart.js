// ReefChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import './ReefChart.css';  // Importando o arquivo CSS

const ReefChart = () => {
    const [chartData, setChartData] = useState(null);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ocean-systems.uc.r.appspot.com/api/sites/1186/daily_data');
                const data = response.data;

                console.log('Dados recebidos da API:', data); // Adicionando esta linha para verificar os dados recebidos

                if (data && Array.isArray(data) && data.length > 0) {
                    const labels = [];
                    const temperatures = [];

                    data.forEach(entry => {
                        const label = entry.date;
                        const temperature = entry.satelliteTemperature;

                        if (label && temperature) {
                            labels.push(label);
                            temperatures.push(temperature);
                        } else {
                            console.error('Label ou temperatura não definidos:', label, temperature);
                        }
                    });

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Temperatura Média Diária (°C)',
                                data: temperatures,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }
                        ]
                    });
                } else {
                    console.error('Dados inválidos:', data);
                }
            }
            catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    day: 'yyyy-MM-dd' // Ajuste aqui
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return (
        <div className="chart-container">
            <h2>Dados de Temperatura Média Diária</h2>
            {chartData ? (
                <canvas ref={chartRef}></canvas>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default ReefChart;
