import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Container
} from '@mui/material';

const ReefDataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ocean-systems.uc.r.appspot.com/api/sites/1186/daily_data');
        const data = response.data;

        console.log('Dados recebidos da API:', data);

        if (data && Array.isArray(data) && data.length > 0) {
          setData(data);
        } else {
          console.error('Dados inválidos:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalhes das Medições Diárias
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="body1" paragraph>

                Aqui, apresentamos uma tabela com os detalhes das medições diárias dos recifes de coral. Cada linha representa uma medição específica, e as colunas exibem informações cruciais, como ID, data da medição, dias de aquecimento, temperatura do satélite, nível de alerta diário, nível de alerta semanal, data de criação e data de atualização.
                <br /><br />

                A finalidade é trazer clareza sobre os pontos de pesquisa relacionados ao monitoramento de recifes de coral. Cada ponto representa uma área específica de estudo, onde são realizadas medições e coletadas informações cruciais para compreender a saúde dos recifes e o ambiente marinho como um todo.
                <br /><br />

                Ao visualizar esses dados, é possível obter uma compreensão mais profunda das condições dos recifes de coral e dos potenciais desafios que enfrentam devido a fatores como o aquecimento global. Essas informações são fundamentais para a implementação de estratégias eficazes de conservação e proteção dos recifes de coral, garantindo assim a preservação desses ecossistemas vitais para a biodiversidade marinha e para as comunidades que dependem deles.
            </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="tabela de dados do recife">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Dias de Aquecimento</TableCell>
                  <TableCell>Temperatura do Satélite (°C)</TableCell>
                  <TableCell>Nível de Alerta Diário</TableCell>
                  <TableCell>Nível de Alerta Semanal</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell>Atualizado em</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((entry, index) => (
                  <TableRow key={entry.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell>{entry.id}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleString()}</TableCell>
                    <TableCell>{entry.degreeHeatingDays}</TableCell>
                    <TableCell>{entry.satelliteTemperature}</TableCell>
                    <TableCell>{entry.dailyAlertLevel}</TableCell>
                    <TableCell>{entry.weeklyAlertLevel}</TableCell>
                    <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{new Date(entry.updatedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ReefDataTable;
