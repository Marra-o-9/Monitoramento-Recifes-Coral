import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Typography } from '@mui/material';

const ReefDataChart = () => {
    const [chartData, setChartData] = useState(null);
    const chartRef = React.useRef(null);
    const chartInstance = React.useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ocean-systems.uc.r.appspot.com/api/sites/1186/daily_data');
                const data = response.data;

                console.log('Dados recebidos da API:', data);

                if (data && Array.isArray(data) && data.length > 0) {
                    const labels = data.map(entry => entry.date);
                    const temperatures = data.map(entry => entry.satelliteTemperature);
                    const degreeHeatingDays = data.map(entry => entry.degreeHeatingDays);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Temperatura do Satélite (°C)',
                                data: temperatures,
                                borderColor: 'rgb(75, 192, 192)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: false,
                                tension: 0.1
                            },
                            {
                                label: 'Dias de Aquecimento',
                                data: degreeHeatingDays,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: false,
                                tension: 0.1
                            }
                        ]
                    });
                } else {
                    console.error('Dados inválidos:', data);
                }
            } catch (error) {
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
                                    day: 'yyyy-MM-dd'
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return (
        <div style={{ textAlign: 'justify', padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Aquecimento e Temperatura do Satélite
            </Typography>
            <Typography variant="body1">
                O gráfico oferece uma análise revelando tanto a temperatura captada por satélite quanto o número de dias de aquecimento. Cada linha no gráfico descreve uma dessas métricas ao longo do tempo, fornecendo uma visão abrangente das condições ambientais nos recifes.
                <br /><br />

                Além disso, ao observar os dados de temperatura e dias de aquecimento, é possível identificar tendências preocupantes que podem afetar significativamente o ecossistema marinho e a saúde dos corais de recifes. A elevação da temperatura da água, especialmente devido ao aquecimento global, tem sido associada a eventos de branqueamento de corais. Esses eventos ocorrem quando os corais, sob estresse térmico, expulsam as algas simbióticas que vivem em seus tecidos, resultando em sua descoloração e potencialmente em sua morte.
                <br /><br />

                O branqueamento de corais não apenas compromete a biodiversidade dos recifes, mas também pode ter impactos econômicos e sociais significativos. Os recifes de coral sustentam uma vasta gama de vida marinha e fornecem recursos essenciais para muitas comunidades costeiras, incluindo pesca, proteção contra tempestades e turismo. Portanto, entender e monitorar de perto essas mudanças nos recifes é crucial para mitigar os efeitos do aquecimento global e proteger os ecossistemas marinhos para as gerações futuras.
            </Typography>
            <div className="chart-container">
                {chartData ? (
                    <canvas ref={chartRef}></canvas>
                ) : (
                    <p>Carregando dados...</p>
                )}
            </div>
        </div>
    );
};

export default ReefDataChart;
