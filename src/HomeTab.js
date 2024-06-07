import React from 'react';
import { Typography, Box } from '@mui/material';

const HomeTab = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                backgroundImage: `url('/ocean.jpg')`,  // Adicionando a imagem como fundo
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                borderRadius: '10px'
            }}
        >

            <Typography variant="body1" align="jutify" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '20px', borderRadius: '10px' }}>
                Nosso grupo tem o prazer de anunciar sua adesão ao projeto, trazendo um compromisso significativo com a pesquisa e aplicação de Machine Learning para a monitoração e redução dos níveis de poluição dos oceanos. Estamos entusiasmados em explorar as vastas possibilidades que essa tecnologia oferece para promover a sustentabilidade dos ecossistemas marinhos. <br /><br />

                Entre os nossos objetivos está a investigação de diversas aplicações de Machine Learning, como a previsão do aumento ou redução da circulação de navios em determinada região e a análise da correlação entre essa circulação e o nível de poluição. Através dessas análises, buscamos contribuir para a compreensão dos impactos das atividades humanas nos oceanos e para o desenvolvimento de estratégias eficazes de conservação marinha.

                <br /><br />

                Estamos comprometidos em utilizar as mais avançadas técnicas de Machine Learning para promover a saúde dos ecossistemas oceânicos e trabalhar em prol de um futuro sustentável para nosso planeta. Junte-se a nós nessa jornada em direção à preservação dos oceanos e à proteção de sua biodiversidade única.
            </Typography>
        </Box>
    );
};

export default HomeTab;
