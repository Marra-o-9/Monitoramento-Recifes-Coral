import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Typography, Card, CardContent, Grid } from '@mui/material';

const ResearchPoints = () => {
    const [researchPoints, setResearchPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResearchPoints = async () => {
            try {
                const response = await axios.get('https://ocean-systems.uc.r.appspot.com/api/site-survey-points?siteId=1186');
                setResearchPoints(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar pontos de pesquisa:', error);
                setLoading(false);
            }
        };

        fetchResearchPoints();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Pontos de Pesquisa
            </Typography>
            <Typography variant="body1" paragraph>
                Abaixo estão listados os pontos de pesquisa relacionados ao monitoramento de recifes de coral. Cada ponto representa uma área específica de estudo, onde são realizadas medições e coletadas informações importantes para entender a saúde dos recifes e o ambiente marinho em geral.
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={4}>
                    {researchPoints.map((point) => (
                        <Grid item xs={12} sm={6} md={6} key={point.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {point.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {point.polygon
                                            ? `Localização: Latitude: ${point.polygon.coordinates[1]}, Longitude: ${point.polygon.coordinates[0]}`
                                            : 'Localização não especificada'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Criado em: {new Date(point.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Atualizado em: {new Date(point.updatedAt).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ResearchPoints;
