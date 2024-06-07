import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';

// Função para traduzir os estados climáticos
const translate = (text) => {
  const translations = {
    "calm": "calmo",
    "healthy": "saudável",
    "evident-disease": "doença evidente",
    // Adicione mais traduções conforme necessário
  };

  return translations[text] || text;
};

const SurveyDetails = () => {
  const [surveys, setSurveys] = useState([]); // Estado para armazenar as pesquisas
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('https://ocean-systems.uc.r.appspot.com/api/sites/1186/surveys');
        setSurveys(response.data); // Define as pesquisas recebidas
        setLoading(false); // Marca o carregamento como concluído
      } catch (error) {
        console.error('Erro ao buscar pesquisas:', error);
        setLoading(false); // Em caso de erro, marca o carregamento como concluído
      }
    };

    fetchSurveys(); // Chama a função para buscar as pesquisas ao montar o componente
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalhes das Pesquisas
      </Typography>
      {loading ? (
        <CircularProgress /> // Exibe um indicador de progresso enquanto os dados estão sendo carregados
      ) : (
        <Grid container spacing={4}>
          {surveys.map((survey) => (
            <Grid item xs={12} key={survey.id}>
              <Card sx={{ display: 'flex' }}>
                {survey.featuredSurveyMedia && ( // Verifica se há mídia destacada
                  <CardMedia
                    component="img"
                    sx={{ width: 160 }}
                    image={survey.featuredSurveyMedia.thumbnailUrl} // Exibe a miniatura da mídia destacada
                    alt="Survey"
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h5" variant="h5">
                    Data do Mergulho: {new Date(survey.diveDate).toLocaleString()} {/* Exibe a data do mergulho */}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Usuário: {survey.user.fullName} {/* Exibe o nome do usuário */}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Condições Climáticas: {translate(survey.weatherConditions)} {/* Exibe as condições climáticas traduzidas */}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Observações: {survey.comments} {/* Exibe as observações */}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Temperatura Satélite: {survey.satelliteTemperature}°C {/* Exibe a temperatura do satélite */}
                  </Typography>
                  {survey.featuredSurveyMedia && ( // Verifica se há mídia destacada
                    <Typography variant="subtitle1" color="text.secondary">
                      Mídia Destacada: {survey.featuredSurveyMedia.comments} {/* Exibe os comentários sobre a mídia destacada */}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SurveyDetails;
