import React from 'react';
import { Container, Typography } from '@mui/material';

import CadastroPessoa from './Components/CadastroPessoa';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Typography variant="h3" component="h1" align="center">
        Cadastro de Pessoa
      </Typography>
      <Container component="article" maxWidth="lg">
        <CadastroPessoa />
      </Container>

    </div>
  );
}

export default App;
