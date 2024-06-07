import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReefChart from './ReefChart';
import ReefDataTable from './ReefDataTable';
import ReefDataChart from './ReefDataChart';
import ResearchPoints from './ResearchPoints';
import SurveyDetails from './SurveyDetails';
import HomeTab from './HomeTab'; 

function App() {
  return (
    <div className="App">
      <h1>Monitoramento de Recifes de Coral</h1>
      <Tabs>
        <TabList>
          <Tab>Home</Tab> 
          <Tab>Detalhes das Pesquisas</Tab>
          <Tab>Pontos de Pesquisa</Tab>
          <Tab>Temperatura Média Diária</Tab>
          <Tab>Dias de Aquecimento</Tab>
          <Tab>Tabela de Dados dos Recifes</Tab>
        </TabList>

        <TabPanel>
          <HomeTab />
        </TabPanel>
        <TabPanel>
          <SurveyDetails />
        </TabPanel>
        <TabPanel>
          <ResearchPoints />
        </TabPanel>
        <TabPanel>
          <ReefChart />
        </TabPanel>
        <TabPanel>
          <ReefDataChart />
        </TabPanel>
        <TabPanel>
          <ReefDataTable />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
